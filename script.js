// ============================================
// VARIÁVEIS GLOBAIS
// ============================================
let map, markers = [], currentTrip = null, trips = [], currentTab = 'itinerary';
let placesService, autocomplete = null, addressAutocomplete = null, mapInitialized = false;
let photos = [], currentExpenseCategory = 'other';
let mapOverlayCollapsed = false;
let currentMapView = 'terrain';
let activePOIs = new Set();
let poiMarkers = [];
let daySearchService = null;

// Geolocalização
let userLocationMarker = null;
let userLocationWatchId = null;
let isFollowingLocation = false;
let isGeolocationActive = false;

// Sistema de Rotas
let directionsService = null;
let directionsRenderers = [];
let routePolylines = [];
let routeOverlays = [];
let routeData = [];

// Configurações
const currencySymbols = {'EUR': '€', 'USD': '$', 'BRL': 'R$', 'GBP': '£'};
const dayColors = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6'];

// ============================================
// TRANSPORT CONFIG (ATUALIZADO COM BUS E TRAIN)
// ============================================
const transportConfig = {
    walking: { color: '#10b981', strokeWeight: 4, strokeOpacity: 0.8, icon: 'fa-walking', label: { pt: 'A Pé', en: 'Walking', es: 'A Pie' }, zIndex: 1 },
    driving: { color: '#3b82f6', strokeWeight: 5, strokeOpacity: 0.85, icon: 'fa-car', label: { pt: 'Carro', en: 'Car', es: 'Coche' }, zIndex: 2 },
    transit: { color: '#8b5cf6', strokeWeight: 5, strokeOpacity: 0.85, icon: 'fa-bus', label: { pt: 'Público', en: 'Public', es: 'Público' }, zIndex: 3 },
    bus: { color: '#3b82f6', strokeWeight: 5, strokeOpacity: 0.85, icon: 'fa-bus', label: { pt: 'Autocarro', en: 'Bus', es: 'Autobús' }, zIndex: 3 },
    train: { color: '#8b5cf6', strokeWeight: 5, strokeOpacity: 0.85, icon: 'fa-train', label: { pt: 'Comboio', en: 'Train', es: 'Tren' }, zIndex: 3 },
    ride: { color: '#06b6d4', strokeWeight: 5, strokeOpacity: 0.85, icon: 'fa-taxi', label: { pt: 'App', en: 'Ride', es: 'App' }, zIndex: 2 },
    flight: { color: '#f59e0b', strokeWeight: 4, strokeOpacity: 0.9, icon: 'fa-plane', label: { pt: 'Voo', en: 'Flight', es: 'Vuelo' }, zIndex: 10 }
};

const expenseCategories = {
    food: { icon: 'fa-utensils', color: 'orange', label: { pt: 'Comida', en: 'Food', es: 'Comida' } },
    transport: { icon: 'fa-bus', color: 'blue', label: { pt: 'Transporte', en: 'Transport', es: 'Transporte' } },
    shopping: { icon: 'fa-shopping-bag', color: 'purple', label: { pt: 'Compras', en: 'Shopping', es: 'Compras' } },
    activity: { icon: 'fa-ticket-alt', color: 'green', label: { pt: 'Atividades', en: 'Activities', es: 'Actividades' } },
    accommodation: { icon: 'fa-bed', color: 'indigo', label: { pt: 'Alojamento', en: 'Accommodation', es: 'Alojamiento' } },
    other: { icon: 'fa-ellipsis-h', color: 'slate', label: { pt: 'Outro', en: 'Other', es: 'Otro' } }
};

const poiTypes = {
    hotel: { type: 'lodging', icon: 'fa-bed', color: '#8b5cf6' },
    restaurant: { type: 'restaurant', icon: 'fa-utensils', color: '#f97316' },
    attraction: { type: 'tourist_attraction', icon: 'fa-camera', color: '#3b82f6' },
    museum: { type: 'museum', icon: 'fa-landmark', color: '#8b5cf6' },
    transit: { type: 'transit_station', icon: 'fa-bus', color: '#10b981' },
    pharmacy: { type: 'pharmacy', icon: 'fa-prescription-bottle-alt', color: '#ef4444' },
    atm: { type: 'atm', icon: 'fa-money-bill-wave', color: '#22c55e' }
};

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se idioma já foi selecionado
    if (!hasLanguageBeenSelected()) {
        showLanguageSelector();
    } else {
        // Idioma já selecionado, inicializar app diretamente
        initializeApp();
    }
});

function initializeApp() {
    loadTripsFromStorage();
    updateTripSelector();
    initI18n();
    
    // Mostrar app
    document.getElementById('app').classList.remove('hidden');
    
    if (trips.length > 0) {
        switchTrip(trips[0].id);
    } else {
        showWelcomeState();
    }
    
    setupOfflineDetection();
    setupModalHandlers();
    setTimeout(initNewTripAutocomplete, 1500);
}

function setupModalHandlers() {
    // Configurar fechamento de modais (exceto modal-locked)
    document.querySelectorAll('.modal:not(.modal-locked)').forEach(modal => { 
        modal.addEventListener('click', (e) => { 
            if (e.target === modal) modal.classList.remove('active'); 
        }); 
    });
    
    // Prevenir fechamento do modal-locked por ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const lockedModal = document.querySelector('.modal-locked.active');
            if (lockedModal) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    });
}

// ============================================
// MAPA - INICIALIZAÇÃO
// ============================================
function initMap() {
    try {
        map = new google.maps.Map(document.getElementById('map'), { 
            center: { lat: 39.5, lng: -8 }, 
            zoom: 6, 
            mapTypeId: 'roadmap', 
            mapTypeControl: false, 
            streetViewControl: false, 
            fullscreenControl: true, 
            zoomControl: true,
            styles: [
                { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] },
                { featureType: 'poi.restaurant', elementType: 'labels', stylers: [{ visibility: 'on' }] },
                { featureType: 'poi.attraction', elementType: 'labels', stylers: [{ visibility: 'on' }] },
                { featureType: 'poi.museum', elementType: 'labels', stylers: [{ visibility: 'on' }] },
                { featureType: 'transit', elementType: 'labels', stylers: [{ visibility: 'on' }] }
            ]
        });
        
        document.getElementById('mapLoader').style.display = 'none';
        placesService = new google.maps.places.PlacesService(map);
        daySearchService = new google.maps.places.PlacesService(map);
        directionsService = new google.maps.DirectionsService();
        mapInitialized = true;
        
        // Adicionar listener para clique no mapa
        map.addListener('click', handleMapClick);
        
        if (currentTrip) {
            updateMapMarkers();
            calculateAndDisplayRoutes();
        }
    } catch (error) { 
        console.error('Erro ao carregar mapa:', error);
        document.getElementById('mapLoader').innerHTML = '<p class="text-red-600">Erro ao carregar mapa. Recarrega a página.</p>'; 
    }
}

// ============================================
// MAPA - VISÃO E POIs
// ============================================
function setMapView(viewType) {
    if (!map) return;
    
    currentMapView = viewType;
    
    // Atualizar botões
    document.getElementById('btnTerrain').classList.toggle('active', viewType === 'terrain');
    document.getElementById('btnSatellite').classList.toggle('active', viewType === 'satellite');
    
    // Mudar tipo do mapa
    if (viewType === 'satellite') {
        map.setMapTypeId('satellite');
    } else {
        map.setMapTypeId('roadmap');
    }
}

function togglePOI(poiType) {
    if (!map || !placesService) return;
    
    const btn = document.querySelector(`[data-poi="${poiType}"]`);
    
    if (activePOIs.has(poiType)) {
        // Desativar POI
        activePOIs.delete(poiType);
        btn.classList.remove('active');
        clearPOIMarkers(poiType);
    } else {
        // Ativar POI
        activePOIs.add(poiType);
        btn.classList.add('active');
        searchAndDisplayPOIs(poiType);
    }
}

function searchAndDisplayPOIs(poiType) {
    if (!currentTrip || !currentTrip.destinationLat) return;
    
    const poiConfig = poiTypes[poiType];
    const center = new google.maps.LatLng(currentTrip.destinationLat, currentTrip.destinationLng);
    
    const request = {
        location: center,
        radius: 5000,
        type: poiConfig.type
    };
    
    placesService.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            results.slice(0, 10).forEach(place => {
                createPOIMarker(place, poiType, poiConfig);
            });
        }
    });
}

function createPOIMarker(place, poiType, poiConfig) {
    const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: poiConfig.color,
            fillOpacity: 0.9,
            strokeWeight: 2,
            strokeColor: '#fff'
        },
        animation: google.maps.Animation.DROP
    });

    marker.poiType = poiType;
    marker.placeData = place;

    // Criar info window com conteúdo enriquecido
    const infoWindow = new google.maps.InfoWindow({
        content: buildPOIInfoWindowContent(place, poiType)
    });

    marker.addListener('click', () => {
        infoWindow.open(map, marker);
        // Carregar detalhes adicionais quando abrir
        loadPlaceDetailsForInfoWindow(place, infoWindow);
    });

    poiMarkers.push(marker);
}

// Construir conteúdo inicial do info window
function buildPOIInfoWindowContent(place, poiType) {
    const name = escapeHtml(place.name);
    const vicinity = escapeHtml(place.vicinity || place.formatted_address || '');
    const rating = place.rating ? `<span class="poi-rating"><i class="fas fa-star"></i> ${place.rating}</span>` : '';
    const priceLevel = place.price_level ? '<span class="poi-price">' + '€'.repeat(place.price_level) + '</span>' : '';

    // Placeholder para fotos (serão carregadas dinamicamente)
    let photosHtml = '<div class="poi-photos-loading" id="poi-photos-' + place.place_id + '"><div class="poi-photo-placeholder"><i class="fas fa-image"></i></div></div>';

    // Placeholder para descrição
    const descriptionHtml = '<div class="poi-description" id="poi-desc-' + place.place_id + '"><span class="poi-loading-text">' + t('loading') + '</span></div>';

    // Placeholder para website (será atualizado dinamicamente)
    const websiteHtml = '<div class="poi-website-placeholder" id="poi-website-' + place.place_id + '"></div>';

    // Link para Google Maps (sempre disponível)
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${place.place_id}`;

    return `
        <div class="poi-info-window-enriched">
            <div class="poi-header">
                <h4>${name}</h4>
                <div class="poi-meta">
                    ${rating}
                    ${priceLevel}
                </div>
            </div>
            <p class="poi-vicinity">${vicinity}</p>
            ${photosHtml}
            ${descriptionHtml}
            ${websiteHtml}
            <div class="poi-actions">
                <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="poi-link-btn">
                    <i class="fas fa-external-link-alt"></i> Google Maps
                </a>
                <button onclick="addPOIToItinerary('${place.place_id}', '${poiType}')" class="poi-add-btn">
                    <i class="fas fa-plus"></i> ${t('add_to_itinerary')}
                </button>
            </div>
        </div>
    `;
}

// Carregar detalhes adicionais do lugar para o info window
function loadPlaceDetailsForInfoWindow(place, infoWindow) {
    if (!placesService || !place.place_id) return;

    const request = {
        placeId: place.place_id,
        fields: ['photos', 'editorial_summary', 'reviews', 'website', 'formatted_phone_number', 'opening_hours']
    };

    placesService.getDetails(request, (details, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && details) {
            // Atualizar fotos
            updatePOIPhotos(place.place_id, details.photos);

            // Atualizar descrição
            updatePOIDescription(place.place_id, details);

            // Atualizar link do website se disponível
            updatePOIWebsiteLink(place.place_id, details.website);

            // Forçar atualização do conteúdo do info window
            // Isso garante que as alterações no DOM sejam refletidas
            const content = infoWindow.getContent();
            infoWindow.setContent(content);
        }
    });
}

// Atualizar fotos no info window
function updatePOIPhotos(placeId, photos) {
    const container = document.getElementById('poi-photos-' + placeId);
    if (!container) return;

    if (photos && photos.length > 0) {
        // Usar até 3 fotos
        const photosToShow = photos.slice(0, 3);
        let photosHtml = '<div class="poi-photos">';

        photosToShow.forEach((photo, index) => {
            try {
                const photoUrl = photo.getUrl({ maxWidth: 200, maxHeight: 150 });
                photosHtml += `<img src="${photoUrl}" alt="Photo ${index + 1}" class="poi-photo" loading="lazy">`;
            } catch (e) {
                // Ignorar erro de foto
            }
        });

        photosHtml += '</div>';
        container.innerHTML = photosHtml;
    } else {
        // Sem fotos - esconder o container
        container.style.display = 'none';
    }
}

// Atualizar descrição no info window
function updatePOIDescription(placeId, details) {
    const container = document.getElementById('poi-desc-' + placeId);
    if (!container) return;

    let description = '';

    // Priorizar editorial_summary (descrição oficial do Google)
    if (details.editorial_summary && details.editorial_summary.overview) {
        description = details.editorial_summary.overview;
    }
    // Alternativa: usar primeira review como descrição
    else if (details.reviews && details.reviews.length > 0) {
        const review = details.reviews[0];
        description = review.text;
        if (description.length > 150) {
            description = description.substring(0, 150) + '...';
        }
    }

    // Adicionar horário de funcionamento se disponível
    let hoursHtml = '';
    if (details.opening_hours) {
        const isOpen = details.opening_hours.isOpen ? 
            '<span class="poi-open">' + (currentLanguage === 'pt' ? 'Aberto agora' : currentLanguage === 'en' ? 'Open now' : 'Abierto ahora') + '</span>' : 
            '<span class="poi-closed">' + (currentLanguage === 'pt' ? 'Fechado' : currentLanguage === 'en' ? 'Closed' : 'Cerrado') + '</span>';
        hoursHtml = `<div class="poi-hours">${isOpen}</div>`;
    }

    if (description) {
        container.innerHTML = `<p class="poi-desc-text">${escapeHtml(description)}</p>${hoursHtml}`;
    } else if (hoursHtml) {
        container.innerHTML = hoursHtml;
    } else {
        // Sem descrição nem horário - esconder o container
        container.style.display = 'none';
    }
}

// Atualizar link do website se disponível
function updatePOIWebsiteLink(placeId, website) {
    if (!website) return;

    // Atualizar o placeholder do website
    const websiteContainer = document.getElementById('poi-website-' + placeId);
    if (websiteContainer) {
        websiteContainer.innerHTML = `
            <a href="${website}" target="_blank" rel="noopener noreferrer" class="poi-website-link">
                <i class="fas fa-globe"></i> Website
            </a>
        `;
    }
}

function clearPOIMarkers(poiType) {
    poiMarkers = poiMarkers.filter(marker => {
        if (marker.poiType === poiType) {
            marker.setMap(null);
            return false;
        }
        return true;
    });
}

function clearAllPOIMarkers() {
    poiMarkers.forEach(marker => marker.setMap(null));
    poiMarkers = [];
    activePOIs.clear();
    document.querySelectorAll('.map-poi-btn').forEach(btn => btn.classList.remove('active'));
}

function addPOIToItinerary(placeId, poiType) {
    if (!currentTrip) {
        showToast(t('create_trip_first'), 'error');
        return;
    }
    
    // Obter detalhes do lugar
    placesService.getDetails({ placeId: placeId }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            // Determinar o dia (último dia com lugares ou primeiro dia)
            let targetDayIndex = 0;
            const dayGroups = {};
            currentTrip.places.forEach(p => {
                if (!dayGroups[p.dayIndex]) dayGroups[p.dayIndex] = [];
                dayGroups[p.dayIndex].push(p);
            });
            
            // Encontrar o último dia com lugares
            const daysWithPlaces = Object.keys(dayGroups).map(Number).sort((a, b) => b - a);
            if (daysWithPlaces.length > 0) {
                targetDayIndex = daysWithPlaces[0];
            }
            
            // Determinar categoria
            let category = 'other';
            if (poiType === 'restaurant') category = 'restaurant';
            else if (poiType === 'attraction' || poiType === 'museum') category = 'attraction';
            else if (poiType === 'transit') category = 'transport';
            else if (poiType === 'hotel') category = 'hotel';
            
            // Obter lugares do dia ordenados por hora
            const dayPlaces = currentTrip.places
                .filter(p => p.dayIndex === targetDayIndex)
                .sort((a, b) => (a.startTime || '00:00').localeCompare(b.startTime || '00:00'));
            
            // Calcular horário automático baseado no último ponto
            let startTime = '';
            let endTime = '';
            const defaultDurationMinutes = category === 'restaurant' ? 90 : 60; // 1.5h para restaurantes, 1h para outros
            
            const placeLat = place.geometry.location.lat();
            const placeLng = place.geometry.location.lng();
            
            if (dayPlaces.length > 0) {
                const lastPlace = dayPlaces[dayPlaces.length - 1];
                const lastEndTime = lastPlace.endTime || lastPlace.startTime;
                
                if (lastEndTime && lastPlace.lat && lastPlace.lng) {
                    // Calcular tempo de deslocamento (a pé por padrão)
                    const travelMinutes = estimateTravelTimeMinutes(
                        lastPlace.lat, lastPlace.lng, placeLat, placeLng, 'walking'
                    );
                    startTime = addMinutesToTime(lastEndTime, travelMinutes);
                } else if (lastEndTime) {
                    // Se não houver coordenadas, adiciona 30 minutos
                    startTime = addMinutesToTime(lastEndTime, 30);
                }
                
                // Se ainda não tem horário, começa às 09:00
                if (!startTime) {
                    startTime = '09:00';
                }
                
                // Calcular hora de fim (duração padrão)
                endTime = addMinutesToTime(startTime, defaultDurationMinutes);
            } else {
                // Primeiro ponto do dia - começa às 09:00
                startTime = '09:00';
                endTime = addMinutesToTime(startTime, defaultDurationMinutes);
            }
            
            const newPlace = {
                id: Date.now().toString(),
                name: place.name,
                category: category,
                dayIndex: targetDayIndex,
                startTime: startTime,
                endTime: endTime,
                cost: 0,
                transportMode: 'walking',
                notes: '',
                address: place.formatted_address || place.vicinity || '',
                lat: placeLat,
                lng: placeLng,
                color: currentTrip.days[targetDayIndex]?.color || dayColors[0]
            };
            
            // Inserir o novo lugar
            currentTrip.places.push(newPlace);
            
            // Reordenar lugares do dia por hora de início
            const dayPlacesToSort = currentTrip.places.filter(p => p.dayIndex === targetDayIndex);
            dayPlacesToSort.sort((a, b) => (a.startTime || '00:00').localeCompare(b.startTime || '00:00'));
            
            // Atualizar a ordem no array principal
            const otherPlaces = currentTrip.places.filter(p => p.dayIndex !== targetDayIndex);
            currentTrip.places = [...otherPlaces, ...dayPlacesToSort];
            
            saveTripsToStorage();
            renderSidebar();
            updateMapMarkers();
            updateMapOverlay();
            setTimeout(() => calculateAndDisplayRoutes(), 300);
            showToast(t('added'));
            
            // Fechar info window
            map.getInfoWindows?.forEach?.(iw => iw.close());
        }
    });
}

// ============================================
// MAPA - CLIQUE (AGORA COM PESQUISA DE LUGARES PRÓXIMOS)
// ============================================
function handleMapClick(event) {
    if (!currentTrip) return;

    // Criar marcador temporário
    const tempMarker = new google.maps.Marker({
        position: event.latLng,
        map: map,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: '#0ea5e9',
            fillOpacity: 0.8,
            strokeWeight: 3,
            strokeColor: '#fff'
        },
        animation: google.maps.Animation.BOUNCE
    });

    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    // Primeiro, tenta encontrar um lugar próximo (estabelecimento) via Places API
    const nearbyRequest = {
        location: event.latLng,
        radius: 50, // raio de 50 metros
        types: ['establishment', 'point_of_interest', 'lodging', 'restaurant', 'tourist_attraction']
    };

    placesService.nearbySearch(nearbyRequest, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
            // Pega o primeiro resultado (mais próximo)
            const place = results[0];
            // Agora obtém detalhes completos
            placesService.getDetails({ placeId: place.place_id, fields: ['name', 'formatted_address', 'rating', 'price_level', 'photos', 'website', 'vicinity'] }, (details, detStatus) => {
                if (detStatus === google.maps.places.PlacesServiceStatus.OK && details) {
                    showRichInfoWindow(details, event.latLng, tempMarker);
                } else {
                    // Fallback para dados básicos do nearby search
                    showRichInfoWindow(place, event.latLng, tempMarker);
                }
            });
        } else {
            // Se não encontrar nenhum lugar próximo, usa geocoding para obter o endereço
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location: event.latLng }, (geoResults, geoStatus) => {
                if (geoStatus === 'OK' && geoResults[0]) {
                    const address = geoResults[0].formatted_address;
                    const placeName = address.split(',')[0];
                    const fakePlace = {
                        name: placeName,
                        formatted_address: address,
                        vicinity: address,
                        rating: null,
                        price_level: null,
                        photos: null,
                        website: null
                    };
                    showRichInfoWindow(fakePlace, event.latLng, tempMarker);
                } else {
                    // Fallback genérico
                    const fallbackPlace = {
                        name: t('place'),
                        formatted_address: '',
                        vicinity: '',
                        rating: null,
                        price_level: null,
                        photos: null,
                        website: null
                    };
                    showRichInfoWindow(fallbackPlace, event.latLng, tempMarker);
                }
            });
        }
    });

    function showRichInfoWindow(place, position, tempMarker) {
        const name = escapeHtml(place.name || t('place'));
        const address = escapeHtml(place.formatted_address || place.vicinity || '');
        const rating = place.rating ? `<span class="poi-rating"><i class="fas fa-star"></i> ${place.rating}</span>` : '';
        const priceLevel = place.price_level ? '<span class="poi-price">' + '€'.repeat(place.price_level) + '</span>' : '';
        
        // Se houver fotos, mostrar uma miniatura
        let photoHtml = '';
        if (place.photos && place.photos.length > 0) {
            try {
                const photoUrl = place.photos[0].getUrl({ maxWidth: 200, maxHeight: 150 });
                photoHtml = `<div class="poi-photos"><img src="${photoUrl}" alt="Foto" class="poi-photo"></div>`;
            } catch (e) {}
        }

        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${position.lat()},${position.lng()}`;

        const content = `
            <div class="poi-info-window-enriched">
                <div class="poi-header">
                    <h4>${name}</h4>
                    <div class="poi-meta">
                        ${rating}
                        ${priceLevel}
                    </div>
                </div>
                <p class="poi-vicinity">${address}</p>
                ${photoHtml}
                <div class="poi-actions">
                    <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="poi-link-btn">
                        <i class="fas fa-external-link-alt"></i> Ver no Google Maps
                    </a>
                    <button onclick="addMapClickToItinerary(${position.lat()}, ${position.lng()}, '${escapeHtml(address)}')" class="poi-add-btn">
                        <i class="fas fa-plus"></i> ${t('add_to_itinerary')}
                    </button>
                </div>
            </div>
        `;

        const infoWindow = new google.maps.InfoWindow({
            content: content,
            position: position
        });

        infoWindow.open(map);

        google.maps.event.addListener(infoWindow, 'closeclick', () => {
            tempMarker.setMap(null);
        });

        setTimeout(() => tempMarker.setAnimation(null), 750);
    }
}

// Helper function to add minutes to a time string (HH:MM)
function addMinutesToTime(timeStr, minutes) {
    if (!timeStr) return '';
    const [hours, mins] = timeStr.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMins = totalMinutes % 60;
    return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
}

// Helper function to calculate travel time in minutes (estimated)
function estimateTravelTimeMinutes(fromLat, fromLng, toLat, toLng, mode) {
    const distance = calculateHaversineDistance(fromLat, fromLng, toLat, toLng);
    // Speeds in km/h (ATUALIZADO COM BUS E TRAIN)
    const speeds = { walking: 5, driving: 50, transit: 30, bus: 30, train: 60, ride: 50, flight: 800 };
    const speed = speeds[mode] || 5;
    const durationMinutes = Math.round((distance / speed) * 60);
    // Add buffer time for walking (5 min), others (10 min)
    const buffer = mode === 'walking' ? 5 : 10;
    return Math.max(durationMinutes + buffer, buffer);
}

function addMapClickToItinerary(lat, lng, address) {
    if (!currentTrip) return;
    
    // Determinar o dia (último dia com lugares ou primeiro dia)
    let targetDayIndex = 0;
    const dayGroups = {};
    currentTrip.places.forEach(p => {
        if (!dayGroups[p.dayIndex]) dayGroups[p.dayIndex] = [];
        dayGroups[p.dayIndex].push(p);
    });
    
    const daysWithPlaces = Object.keys(dayGroups).map(Number).sort((a, b) => b - a);
    if (daysWithPlaces.length > 0) {
        targetDayIndex = daysWithPlaces[0];
    }
    
    // Obter lugares do dia ordenados por hora
    const dayPlaces = currentTrip.places
        .filter(p => p.dayIndex === targetDayIndex)
        .sort((a, b) => (a.startTime || '00:00').localeCompare(b.startTime || '00:00'));
    
    // Calcular horário automático baseado no último ponto
    let startTime = '';
    let endTime = '';
    const defaultDurationMinutes = 60; // 1 hora padrão para novos POIs
    
    if (dayPlaces.length > 0) {
        const lastPlace = dayPlaces[dayPlaces.length - 1];
        const lastEndTime = lastPlace.endTime || lastPlace.startTime;
        
        if (lastEndTime && lastPlace.lat && lastPlace.lng) {
            // Calcular tempo de deslocamento (a pé por padrão)
            const travelMinutes = estimateTravelTimeMinutes(
                lastPlace.lat, lastPlace.lng, lat, lng, 'walking'
            );
            startTime = addMinutesToTime(lastEndTime, travelMinutes);
        } else if (lastEndTime) {
            // Se não houver coordenadas, adiciona 30 minutos
            startTime = addMinutesToTime(lastEndTime, 30);
        }
        
        // Se ainda não tem horário, começa às 09:00
        if (!startTime) {
            startTime = '09:00';
        }
        
        // Calcular hora de fim (duração padrão)
        endTime = addMinutesToTime(startTime, defaultDurationMinutes);
    } else {
        // Primeiro ponto do dia - começa às 09:00
        startTime = '09:00';
        endTime = addMinutesToTime(startTime, defaultDurationMinutes);
    }
    
    const newPlace = {
        id: Date.now().toString(),
        name: address.split(',')[0] || t('place'),
        category: 'other',
        dayIndex: targetDayIndex,
        startTime: startTime,
        endTime: endTime,
        cost: 0,
        transportMode: 'walking',
        notes: '',
        address: address,
        lat: lat,
        lng: lng,
        color: currentTrip.days[targetDayIndex]?.color || dayColors[0]
    };
    
    // Inserir o novo lugar mantendo a ordem cronológica
    currentTrip.places.push(newPlace);
    
    // Reordenar lugares do dia por hora de início
    const dayPlacesToSort = currentTrip.places.filter(p => p.dayIndex === targetDayIndex);
    dayPlacesToSort.sort((a, b) => (a.startTime || '00:00').localeCompare(b.startTime || '00:00'));
    
    // Atualizar a ordem no array principal
    const otherPlaces = currentTrip.places.filter(p => p.dayIndex !== targetDayIndex);
    currentTrip.places = [...otherPlaces, ...dayPlacesToSort];
    
    saveTripsToStorage();
    renderSidebar();
    updateMapMarkers();
    updateMapOverlay();
    setTimeout(() => calculateAndDisplayRoutes(), 300);
    showToast(t('added'));
    
    // Fechar todas as info windows
    map.getInfoWindows?.forEach?.(iw => iw.close());
}

// ============================================
// GEOLOCALIZAÇÃO / POSIÇÃO EM TEMPO REAL
// ============================================
function toggleGeolocation() {
    if (isGeolocationActive) {
        stopGeolocation();
    } else {
        startGeolocation();
    }
}

function startGeolocation() {
    if (!navigator.geolocation) {
        showToast('Geolocalização não suportada neste navegador', 'error');
        return;
    }
    
    // Solicitar permissão e iniciar tracking
    navigator.geolocation.getCurrentPosition(
        (position) => {
            // Permissão concedida - iniciar watch
            isGeolocationActive = true;
            
            // Atualizar UI
            const btn = document.getElementById('geoLocationBtn');
            const followBtn = document.getElementById('followLocationBtn');
            const status = document.getElementById('locationStatus');
            
            if (btn) btn.classList.add('active');
            if (followBtn) followBtn.classList.remove('hidden');
            if (status) {
                status.classList.add('show', 'active');
                status.querySelector('span').textContent = t('location_active');
            }
            
            // Criar marcador inicial
            updateUserLocationMarker(position.coords.latitude, position.coords.longitude);
            
            // Iniciar watch para atualizações em tempo real
            userLocationWatchId = navigator.geolocation.watchPosition(
                (pos) => {
                    updateUserLocationMarker(pos.coords.latitude, pos.coords.longitude);
                    
                    // Se estiver em modo follow, centrar o mapa
                    if (isFollowingLocation && map) {
                        map.panTo({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                    }
                },
                (error) => {
                    console.error('Erro ao obter localização:', error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
            
            showToast(t('location_active'));
        },
        (error) => {
            // Permissão negada ou erro
            console.error('Permissão de geolocalização negada:', error);
            showToast(t('location_denied'), 'error');
            
            const status = document.getElementById('locationStatus');
            if (status) {
                status.classList.add('show', 'error');
                status.querySelector('span').textContent = t('location_denied');
                setTimeout(() => status.classList.remove('show'), 3000);
            }
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

function stopGeolocation() {
    isGeolocationActive = false;
    isFollowingLocation = false;
    
    // Parar watch
    if (userLocationWatchId !== null) {
        navigator.geolocation.clearWatch(userLocationWatchId);
        userLocationWatchId = null;
    }
    
    // Remover marcador
    if (userLocationMarker) {
        userLocationMarker.setMap(null);
        userLocationMarker = null;
    }
    
    // Atualizar UI
    const btn = document.getElementById('geoLocationBtn');
    const followBtn = document.getElementById('followLocationBtn');
    const status = document.getElementById('locationStatus');
    
    if (btn) btn.classList.remove('active');
    if (followBtn) {
        followBtn.classList.add('hidden');
        followBtn.classList.remove('following');
    }
    if (status) status.classList.remove('show', 'active', 'error');
}

function toggleFollowLocation() {
    isFollowingLocation = !isFollowingLocation;
    
    const btn = document.getElementById('followLocationBtn');
    const tooltip = btn?.querySelector('.geolocation-tooltip');
    
    if (isFollowingLocation) {
        btn?.classList.add('following');
        if (tooltip) tooltip.textContent = t('stop_following');
        
        // Centrar imediatamente na posição atual
        if (userLocationMarker) {
            const position = userLocationMarker.getPosition();
            if (position && map) {
                map.panTo(position);
            }
        }
    } else {
        btn?.classList.remove('following');
        if (tooltip) tooltip.textContent = t('follow_location');
    }
}

function updateUserLocationMarker(lat, lng) {
    const position = new google.maps.LatLng(lat, lng);
    
    if (userLocationMarker) {
        // Atualizar posição do marcador existente
        userLocationMarker.setPosition(position);
    } else {
        // Criar novo marcador
        userLocationMarker = new google.maps.Marker({
            position: position,
            map: map,
            title: t('my_location'),
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#0ea5e9',
                fillOpacity: 1,
                strokeWeight: 3,
                strokeColor: '#fff'
            },
            zIndex: 1000
        });
        
        // Adicionar círculo de pulso ao redor do marcador
        const pulseCircle = new google.maps.Circle({
            map: map,
            center: position,
            radius: 50,
            fillColor: '#0ea5e9',
            fillOpacity: 0.2,
            strokeColor: '#0ea5e9',
            strokeOpacity: 0.5,
            strokeWeight: 1
        });
        
        // Guardar referência ao círculo no marcador
        userLocationMarker.pulseCircle = pulseCircle;
    }
    
    // Atualizar círculo de pulso
    if (userLocationMarker.pulseCircle) {
        userLocationMarker.pulseCircle.setCenter(position);
    }
}

// ============================================
// BARRA DE PESQUISA POR DIA
// ============================================
function initDaySearch(dayIndex, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const searchInput = container.querySelector('.day-search-input');
    const resultsContainer = container.querySelector('.day-search-results');
    
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            resultsContainer.innerHTML = '';
            resultsContainer.classList.add('hidden');
            return;
        }
        
        searchTimeout = setTimeout(() => {
            performDaySearch(query, dayIndex, resultsContainer);
        }, 300);
    });
    
    // Fechar resultados ao clicar fora
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
            resultsContainer.classList.add('hidden');
        }
    });
}

function performDaySearch(query, dayIndex, resultsContainer) {
    if (!placesService || !currentTrip) return;

    // Determinar local de pesquisa
    let searchLocation = null;
    let searchRadius = 5000;
    let hasActivePoint = false;

    // VERIFICAÇÃO CRÍTICA: Se existirem lugares neste dia, pesquisar perto do ÚLTIMO ponto
    const dayPlaces = currentTrip.places.filter(p => p.dayIndex === dayIndex);
    if (dayPlaces.length > 0) {
        const lastPlace = dayPlaces[dayPlaces.length - 1];
        if (lastPlace.lat && lastPlace.lng) {
            searchLocation = new google.maps.LatLng(lastPlace.lat, lastPlace.lng);
            searchRadius = 2000; // 2km do último ponto
            hasActivePoint = true;
        }
    }

    // Se não houver lugares no dia, usar a cidade destino
    if (!searchLocation && currentTrip.destinationLat) {
        searchLocation = new google.maps.LatLng(currentTrip.destinationLat, currentTrip.destinationLng);
        searchRadius = 10000; // 10km da cidade
    }

    if (!searchLocation) return;

    // Verificar se é uma categoria específica
    const categoryKeywords = {
        'restaurante': 'restaurant',
        'restaurant': 'restaurant',
        'comida': 'restaurant',
        'food': 'restaurant',
        'farmacia': 'pharmacy',
        'pharmacy': 'pharmacy',
        'farmacias': 'pharmacy',
        'multibanco': 'atm',
        'atm': 'atm',
        'caixa': 'atm',
        'museu': 'museum',
        'museum': 'museum',
        'museus': 'museum',
        'transporte': 'transit_station',
        'transit': 'transit_station',
        'metro': 'subway_station',
        'comboio': 'train_station',
        'atração': 'tourist_attraction',
        'attraction': 'tourist_attraction',
        'pontos': 'tourist_attraction',
        'hotel': 'lodging',
        'hoteis': 'lodging',
        'hotels': 'lodging'
    };

    const lowerQuery = query.toLowerCase();
    let searchType = null;

    for (const [keyword, type] of Object.entries(categoryKeywords)) {
        if (lowerQuery.includes(keyword)) {
            searchType = type;
            break;
        }
    }

    const request = {
        location: searchLocation,
        radius: searchRadius,
        keyword: query
    };

    if (searchType) {
        request.type = searchType;
    }

    placesService.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
            // ORDENAÇÃO POR DISTÂNCIA: Se houver ponto ativo, ordenar resultados por distância
            let sortedResults = results;
            if (hasActivePoint && searchLocation) {
                sortedResults = sortResultsByDistance(results, searchLocation);
            }
            displayDaySearchResults(sortedResults.slice(0, 5), dayIndex, resultsContainer);
        } else {
            // Tentar text search se nearby search falhar
            const textRequest = {
                location: searchLocation,
                radius: searchRadius,
                query: query
            };

            placesService.textSearch(textRequest, (textResults, textStatus) => {
                if (textStatus === google.maps.places.PlacesServiceStatus.OK && textResults && textResults.length > 0) {
                    // ORDENAÇÃO POR DISTÂNCIA: Se houver ponto ativo, ordenar resultados por distância
                    let sortedResults = textResults;
                    if (hasActivePoint && searchLocation) {
                        sortedResults = sortResultsByDistance(textResults, searchLocation);
                    }
                    displayDaySearchResults(sortedResults.slice(0, 5), dayIndex, resultsContainer);
                } else {
                    resultsContainer.innerHTML = `<div class="p-4 text-center text-slate-500 text-sm">${t('no_places')}</div>`;
                    resultsContainer.classList.remove('hidden');
                }
            });
        }
    });
}

// Função auxiliar para ordenar resultados por distância de um ponto de referência
function sortResultsByDistance(results, referenceLocation) {
    return results.sort((a, b) => {
        const distA = calculateDistance(
            referenceLocation.lat(), referenceLocation.lng(),
            a.geometry.location.lat(), a.geometry.location.lng()
        );
        const distB = calculateDistance(
            referenceLocation.lat(), referenceLocation.lng(),
            b.geometry.location.lat(), b.geometry.location.lng()
        );
        return distA - distB;
    });
}

// Calcular distância entre dois pontos (fórmula de Haversine)
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function displayDaySearchResults(results, dayIndex, container) {
    container.innerHTML = results.map(place => {
        const icon = place.types?.includes('restaurant') ? 'fa-utensils text-orange-500' :
                    place.types?.includes('museum') ? 'fa-landmark text-purple-500' :
                    place.types?.includes('tourist_attraction') ? 'fa-camera text-blue-500' :
                    place.types?.includes('pharmacy') ? 'fa-prescription-bottle-alt text-red-500' :
                    place.types?.includes('atm') ? 'fa-money-bill-wave text-green-500' :
                    place.types?.includes('lodging') ? 'fa-bed text-purple-500' :
                    'fa-map-marker-alt text-primary-500';
        
        return `
            <div class="day-search-result-item" onclick="addDaySearchResultToItinerary('${place.place_id}', ${dayIndex})">
                <div class="day-search-result-icon">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="day-search-result-info">
                    <div class="day-search-result-name">${escapeHtml(place.name)}</div>
                    <div class="day-search-result-address">${escapeHtml(place.vicinity || place.formatted_address || '')}</div>
                </div>
                <div class="day-search-result-add">
                    <i class="fas fa-plus"></i>
                </div>
            </div>
        `;
    }).join('');
    
    container.classList.remove('hidden');
}

function addDaySearchResultToItinerary(placeId, dayIndex) {
    if (!currentTrip || !placesService) return;
    
    placesService.getDetails({ placeId: placeId }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            // Determinar categoria
            let category = 'other';
            if (place.types) {
                if (place.types.includes('restaurant') || place.types.includes('food')) category = 'restaurant';
                else if (place.types.includes('museum')) category = 'attraction';
                else if (place.types.includes('tourist_attraction')) category = 'attraction';
                else if (place.types.includes('transit_station') || place.types.includes('subway_station')) category = 'transport';
                else if (place.types.includes('lodging')) category = 'hotel';
            }
            
            // Obter lugares do dia ordenados por hora
            const dayPlaces = currentTrip.places
                .filter(p => p.dayIndex === dayIndex)
                .sort((a, b) => (a.startTime || '00:00').localeCompare(b.startTime || '00:00'));
            
            // Calcular horário automático baseado no último ponto
            let startTime = '';
            let endTime = '';
            const defaultDurationMinutes = category === 'restaurant' ? 90 : 60;
            
            const placeLat = place.geometry.location.lat();
            const placeLng = place.geometry.location.lng();
            
            if (dayPlaces.length > 0) {
                const lastPlace = dayPlaces[dayPlaces.length - 1];
                const lastEndTime = lastPlace.endTime || lastPlace.startTime;
                
                if (lastEndTime && lastPlace.lat && lastPlace.lng) {
                    // Calcular tempo de deslocamento (a pé por padrão)
                    const travelMinutes = estimateTravelTimeMinutes(
                        lastPlace.lat, lastPlace.lng, placeLat, placeLng, 'walking'
                    );
                    startTime = addMinutesToTime(lastEndTime, travelMinutes);
                } else if (lastEndTime) {
                    startTime = addMinutesToTime(lastEndTime, 30);
                }
                
                if (!startTime) {
                    startTime = '09:00';
                }
                
                endTime = addMinutesToTime(startTime, defaultDurationMinutes);
            } else {
                // Primeiro ponto do dia
                startTime = '09:00';
                endTime = addMinutesToTime(startTime, defaultDurationMinutes);
            }
            
            const newPlace = {
                id: Date.now().toString(),
                name: place.name,
                category: category,
                dayIndex: dayIndex,
                startTime: startTime,
                endTime: endTime,
                cost: 0,
                transportMode: 'walking',
                notes: '',
                address: place.formatted_address || place.vicinity || '',
                lat: placeLat,
                lng: placeLng,
                color: currentTrip.days[dayIndex]?.color || dayColors[0]
            };
            
            currentTrip.places.push(newPlace);
            
            // Reordenar lugares do dia por hora de início
            const dayPlacesToSort = currentTrip.places.filter(p => p.dayIndex === dayIndex);
            dayPlacesToSort.sort((a, b) => (a.startTime || '00:00').localeCompare(b.startTime || '00:00'));
            
            // Atualizar a ordem no array principal
            const otherPlaces = currentTrip.places.filter(p => p.dayIndex !== dayIndex);
            currentTrip.places = [...otherPlaces, ...dayPlacesToSort];
            
            saveTripsToStorage();
            renderSidebar();
            updateMapMarkers();
            updateMapOverlay();
            setTimeout(() => calculateAndDisplayRoutes(), 300);
            showToast(t('added'));
            
            // Limpar pesquisa
            const container = document.getElementById(`day-search-results-${dayIndex}`);
            if (container) {
                container.innerHTML = '';
                container.classList.add('hidden');
            }
            const input = document.getElementById(`day-search-input-${dayIndex}`);
            if (input) input.value = '';
        }
    });
}

// ============================================
// MAP OVERLAY
// ============================================
function toggleMapOverlay() {
    mapOverlayCollapsed = !mapOverlayCollapsed;
    const content = document.getElementById('mapOverlayContent');
    const icon = document.getElementById('mapOverlayIcon');
    
    if (mapOverlayCollapsed) {
        content.classList.add('collapsed');
        icon.className = 'fas fa-plus';
    } else {
        content.classList.remove('collapsed');
        icon.className = 'fas fa-minus';
    }
}

function updateMapOverlay() {
    const card = document.getElementById('mapOverlayCard');
    const destinationEl = document.getElementById('overlayDestination');
    const datesEl = document.getElementById('overlayDates');
    const budgetEl = document.getElementById('overlayBudget');
    
    if (!card || !destinationEl || !datesEl || !budgetEl) return;
    
    if (!currentTrip) { 
        card.style.display = 'none'; 
        return; 
    }
    
    card.style.display = 'block';
    destinationEl.textContent = currentTrip.destination || '';
    datesEl.textContent = `${formatDate(currentTrip.startDate)} - ${formatDate(currentTrip.endDate)}`;
    
    const totalSpent = calculateTotalExpenses();
    const budgetTextEl = budgetEl.querySelector('p.font-bold');
    if (budgetTextEl) {
        budgetTextEl.textContent = currentTrip.budget > 0 ? `€${totalSpent.toFixed(0)} / €${currentTrip.budget}` : `€${totalSpent.toFixed(0)}`;
    }
}

// ============================================
// SISTEMA DE ROTAS (ATUALIZADO COM BUS E TRAIN)
// ============================================
function calculateAndDisplayRoutes() {
    if (!map || !currentTrip || !directionsService) return;
    
    clearAllRoutes();
    routeData = [];
    
    const dayGroups = {};
    currentTrip.places.forEach(place => {
        if (!dayGroups[place.dayIndex]) dayGroups[place.dayIndex] = [];
        dayGroups[place.dayIndex].push(place);
    });
    
    Object.keys(dayGroups).forEach(dayIndex => {
        const dayPlaces = dayGroups[dayIndex].sort((a, b) => {
            return (a.startTime || '00:00').localeCompare(b.startTime || '00:00');
        });
        
        for (let i = 0; i < dayPlaces.length - 1; i++) {
            const from = dayPlaces[i];
            const to = dayPlaces[i + 1];
            
            if (from.lat && from.lng && to.lat && to.lng) {
                calculateRoute(from, to, dayIndex);
            }
        }
    });
    
    updateRouteSummary();
}

function calculateRoute(from, to, dayIndex) {
    const transportMode = to.transportMode || 'walking';
    
    if (transportMode === 'flight') {
        drawGreatCircleRoute(from, to, dayIndex);
    } else {
        drawGoogleRoute(from, to, transportMode, dayIndex);
    }
}

// FUNÇÃO drawGoogleRoute MODIFICADA PARA SUPORTAR BUS E TRAIN
function drawGoogleRoute(from, to, mode, dayIndex) {
    let travelMode = google.maps.TravelMode.WALKING;
    let transitOptions = null;

    switch (mode) {
        case 'walking':
            travelMode = google.maps.TravelMode.WALKING;
            break;
        case 'driving':
        case 'ride':
            travelMode = google.maps.TravelMode.DRIVING;
            break;
        case 'transit':
            travelMode = google.maps.TravelMode.TRANSIT;
            transitOptions = {
                modes: [google.maps.TransitMode.BUS, google.maps.TransitMode.SUBWAY, google.maps.TransitMode.TRAIN, google.maps.TransitMode.TRAM]
            };
            break;
        case 'bus':
            travelMode = google.maps.TravelMode.TRANSIT;
            transitOptions = { modes: [google.maps.TransitMode.BUS] };
            break;
        case 'train':
            travelMode = google.maps.TravelMode.TRANSIT;
            transitOptions = { modes: [google.maps.TransitMode.TRAIN, google.maps.TransitMode.SUBWAY, google.maps.TransitMode.TRAM] };
            break;
        default:
            travelMode = google.maps.TravelMode.WALKING;
    }

    const request = {
        origin: new google.maps.LatLng(from.lat, from.lng),
        destination: new google.maps.LatLng(to.lat, to.lng),
        travelMode: travelMode,
        unitSystem: google.maps.UnitSystem.METRIC
    };
    if (transitOptions) request.transitOptions = transitOptions;

    directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            const config = transportConfig[mode] || transportConfig.walking;
            
            const renderer = new google.maps.DirectionsRenderer({
                map: map,
                directions: result,
                suppressMarkers: true,
                preserveViewport: true,
                polylineOptions: {
                    strokeColor: config.color,
                    strokeOpacity: config.strokeOpacity,
                    strokeWeight: config.strokeWeight,
                    zIndex: config.zIndex
                }
            });
            
            directionsRenderers.push(renderer);
            
            const route = result.routes[0];
            const leg = route.legs[0];
            
            const routeInfo = {
                from: from,
                to: to,
                mode: mode,
                distance: leg.distance.value,
                distanceText: leg.distance.text,
                duration: leg.duration.value,
                durationText: leg.duration.text,
                dayIndex: dayIndex,
                path: leg.steps.map(step => ({
                    instructions: step.instructions,
                    distance: step.distance.text,
                    duration: step.duration.text,
                    travelMode: step.travel_mode
                }))
            };
            
            to.routeFromPrev = routeInfo;
            routeData.push(routeInfo);
            
            if (currentTab === 'itinerary' || currentTab === 'stats') {
                renderSidebar();
            }
            
            updateRouteSummary();
        } else {
            console.warn('Não foi possível calcular rota:', status);
            drawFallbackRoute(from, to, mode, dayIndex);
        }
    });
}

function drawGreatCircleRoute(from, to, dayIndex) {
    // Linha reta simples entre os dois pontos (sem curvatura)
    const config = transportConfig.flight;

    const polyline = new google.maps.Polyline({
        path: [
            { lat: from.lat, lng: from.lng },
            { lat: to.lat, lng: to.lng }
        ],
        geodesic: false,
        strokeColor: config.color,
        strokeOpacity: config.strokeOpacity,
        strokeWeight: config.strokeWeight,
        zIndex: config.zIndex
    });

    polyline.setMap(map);
    routePolylines.push(polyline);

    const distance = calculateHaversineDistance(from.lat, from.lng, to.lat, to.lng);
    const durationHours = distance / 800;
    const durationMinutes = Math.round(durationHours * 60);

    let durationText;
    if (durationHours >= 1) {
        const hours = Math.floor(durationHours);
        const mins = Math.round((durationHours - hours) * 60);
        durationText = `${hours}h ${mins > 0 ? mins + 'min' : ''}`;
    } else {
        durationText = `${durationMinutes} min`;
    }

    const routeInfo = {
        from: from,
        to: to,
        mode: 'flight',
        distance: distance * 1000,
        distanceText: `${distance.toFixed(0)} km`,
        duration: durationMinutes * 60,
        durationText: durationText,
        dayIndex: dayIndex,
        isFlight: true
    };

    to.routeFromPrev = routeInfo;
    routeData.push(routeInfo);

    if (currentTab === 'itinerary' || currentTab === 'stats') {
        renderSidebar();
    }

    updateRouteSummary();
}

function calculateGreatCirclePoints(from, to, numPoints) {
    const points = [];
    
    const lat1 = from.lat() * Math.PI / 180;
    const lng1 = from.lng() * Math.PI / 180;
    const lat2 = to.lat() * Math.PI / 180;
    const lng2 = to.lng() * Math.PI / 180;
    
    const d = 2 * Math.asin(Math.sqrt(
        Math.pow(Math.sin((lat2 - lat1) / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lng2 - lng1) / 2), 2)
    ));
    
    for (let i = 0; i <= numPoints; i++) {
        const f = i / numPoints;
        const A = Math.sin((1 - f) * d) / Math.sin(d);
        const B = Math.sin(f * d) / Math.sin(d);
        
        const x = A * Math.cos(lat1) * Math.cos(lng1) + B * Math.cos(lat2) * Math.cos(lng2);
        const y = A * Math.cos(lat1) * Math.sin(lng1) + B * Math.cos(lat2) * Math.sin(lng2);
        const z = A * Math.sin(lat1) + B * Math.sin(lat2);
        
        const lat = Math.atan2(z, Math.sqrt(x * x + y * y)) * 180 / Math.PI;
        const lng = Math.atan2(y, x) * 180 / Math.PI;
        
        points.push(new google.maps.LatLng(lat, lng));
    }
    
    return points;
}

function calculateHaversineDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// FUNÇÃO drawFallbackRoute ATUALIZADA COM VELOCIDADES PARA BUS E TRAIN
function drawFallbackRoute(from, to, mode, dayIndex) {
    const config = transportConfig[mode] || transportConfig.walking;
    const distance = calculateHaversineDistance(from.lat, from.lng, to.lat, to.lng);
    
    const speeds = { walking: 5, driving: 50, transit: 30, bus: 30, train: 60, ride: 50, flight: 800 };
    const speed = speeds[mode] || 5;
    const durationMinutes = Math.round((distance / speed) * 60);
    
    const polyline = new google.maps.Polyline({
        path: [
            new google.maps.LatLng(from.lat, from.lng),
            new google.maps.LatLng(to.lat, to.lng)
        ],
        geodesic: true,
        strokeColor: config.color,
        strokeOpacity: config.strokeOpacity * 0.7,
        strokeWeight: config.strokeWeight,
        strokePattern: mode === 'walking' ? null : [10, 10],
        zIndex: config.zIndex
    });
    
    polyline.setMap(map);
    routePolylines.push(polyline);
    
    const routeInfo = {
        from: from,
        to: to,
        mode: mode,
        distance: distance * 1000,
        distanceText: `${distance.toFixed(1)} km (est.)`,
        duration: durationMinutes * 60,
        durationText: `${durationMinutes} min (est.)`,
        dayIndex: dayIndex,
        isEstimated: true
    };
    
    to.routeFromPrev = routeInfo;
    routeData.push(routeInfo);
    
    if (currentTab === 'itinerary' || currentTab === 'stats') {
        renderSidebar();
    }
    
    updateRouteSummary();
}

function clearAllRoutes() {
    directionsRenderers.forEach(renderer => renderer.setMap(null));
    directionsRenderers = [];
    
    routePolylines.forEach(polyline => polyline.setMap(null));
    routePolylines = [];
    
    routeOverlays.forEach(overlay => overlay.setMap(null));
    routeOverlays = [];
}

function updateRouteSummary() {
    const summaryDiv = document.getElementById('routeSummary');
    if (!summaryDiv || routeData.length === 0) {
        if (summaryDiv) summaryDiv.classList.add('hidden');
        return;
    }
    
    let totalDistance = 0;
    let totalDuration = 0;
    
    routeData.forEach(route => {
        totalDistance += route.distance;
        totalDuration += route.duration;
    });
    
    let distanceText;
    if (totalDistance >= 1000) {
        distanceText = (totalDistance / 1000).toFixed(1) + ' km';
    } else {
        distanceText = Math.round(totalDistance) + ' m';
    }
    
    let durationText;
    const totalMinutes = Math.round(totalDuration / 60);
    if (totalMinutes >= 60) {
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        durationText = `${hours}h ${mins > 0 ? mins + 'min' : ''}`;
    } else {
        durationText = `${totalMinutes} min`;
    }
    
    document.getElementById('totalRouteDistance').textContent = distanceText;
    document.getElementById('totalRouteTime').textContent = durationText;
    document.getElementById('totalRouteSegments').textContent = routeData.length;
    
    summaryDiv.classList.remove('hidden');
}

function calculateTransportStats() {
    const stats = {
        walking: { km: 0, time: 0, count: 0 },
        driving: { km: 0, time: 0, count: 0 },
        transit: { km: 0, time: 0, count: 0 },
        bus: { km: 0, time: 0, count: 0 },
        train: { km: 0, time: 0, count: 0 },
        ride: { km: 0, time: 0, count: 0 },
        flight: { km: 0, time: 0, count: 0 },
        total: { km: 0, time: 0 }
    };
    
    routeData.forEach(route => {
        const mode = route.mode;
        const km = route.distance / 1000;
        const minutes = route.duration / 60;
        
        if (stats[mode]) {
            stats[mode].km += km;
            stats[mode].time += minutes;
            stats[mode].count++;
        }
        
        stats.total.km += km;
        stats.total.time += minutes;
    });
    
    return stats;
}

function calculateDayRouteStats(dayIndex) {
    const dayRoutes = routeData.filter(r => r.dayIndex === dayIndex);
    
    let totalDistance = 0;
    let totalDuration = 0;
    
    dayRoutes.forEach(route => {
        totalDistance += route.distance;
        totalDuration += route.duration;
    });
    
    return {
        distance: totalDistance,
        duration: totalDuration,
        segments: dayRoutes.length
    };
}


// ============================================
// ONBOARDING
// ============================================
function checkOnboarding() {
    if (!localStorage.getItem('totravel_onboarding')) {
        document.getElementById('onboardingModal').classList.remove('hidden');
        document.getElementById('onboardingModal').style.display = 'flex';
    }
}

function nextOnboarding(step) {
    ['onboardingStep1', 'onboardingStep2', 'onboardingStep3'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    document.getElementById('onboardingStep' + step).classList.remove('hidden');
    document.getElementById('onboardingStep' + step).classList.add('animate-fade-in');
}

function skipOnboarding() { 
    localStorage.setItem('totravel_onboarding', 'true'); 
    document.getElementById('onboardingModal').classList.add('hidden');
    document.getElementById('onboardingModal').style.display = 'none';
}

function finishOnboarding() { 
    localStorage.setItem('totravel_onboarding', 'true'); 
    document.getElementById('onboardingModal').classList.add('hidden');
    document.getElementById('onboardingModal').style.display = 'none';
    showToast(t('explore') + '! 🎉'); 
    openTemplateModal(); 
}

// ============================================
// TEMPLATES
// ============================================
function openTemplateModal() { 
    document.getElementById('templateModal').classList.add('active'); 
}

function closeTemplateModal() { 
    document.getElementById('templateModal').classList.remove('active'); 
}

function selectTemplate(templateType) {
    closeTemplateModal();
    if (templateType === 'blank') { 
        openNewTripModal(); 
        return; 
    }
    
    const templates = { 
        romance: { name: { pt: 'Escapadinha Romântica', en: 'Romantic Getaway', es: 'Escapada Romántica' }, days: 3, budget: 800 }, 
        aventura: { name: { pt: 'Aventura na Natureza', en: 'Nature Adventure', es: 'Aventura en la Naturaleza' }, days: 7, budget: 1200 }, 
        familia: { name: { pt: 'Férias em Família', en: 'Family Vacation', es: 'Vacaciones en Familia' }, days: 10, budget: 2500 }, 
        citybreak: { name: { pt: 'City Break', en: 'City Break', es: 'City Break' }, days: 3, budget: 600 }, 
        praia: { name: { pt: 'Relax na Praia', en: 'Beach Relax', es: 'Relax en la Playa' }, days: 7, budget: 1500 } 
    };
    
    const template = templates[templateType];
    const today = new Date();
    document.getElementById('newTripName').value = template.name[currentLanguage];
    document.getElementById('newTripStart').value = today.toISOString().split('T')[0];
    document.getElementById('newTripEnd').value = new Date(today.setDate(today.getDate() + template.days - 1)).toISOString().split('T')[0];
    document.getElementById('newTripBudget').value = template.budget;
    openNewTripModal();
    showToast(`Template "${template.name[currentLanguage]}" carregado!`);
}

// ============================================
// VIAGENS - CRUD
// ============================================
function showWelcomeState() {
    document.getElementById('sidebar-content').innerHTML = `
        <div class="text-center py-12 animate-fade-in">
            <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
                <i class="fas fa-plane-departure text-4xl text-primary-600"></i>
            </div>
            <h3 class="font-display text-xl font-bold text-slate-800 mb-2">${t('start_adventure')}</h3>
            <p class="text-slate-500 mb-6 max-w-xs mx-auto">${t('create_own')}</p>
            <div class="space-y-3">
                <button onclick="openTemplateModal()" class="w-full py-4 btn-primary text-white rounded-xl font-medium touch-feedback">
                    <i class="fas fa-rocket mr-2"></i>${t('choose_template')}
                </button>
                <button onclick="openNewTripModal()" class="w-full py-4 border-2 border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition touch-feedback">
                    <i class="fas fa-plus mr-2"></i>${t('start_scratch')}
                </button>
                <button onclick="openImportModal()" class="w-full py-4 border-2 border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition touch-feedback">
                    <i class="fas fa-download mr-2"></i>${t('load_trip')}
                </button>
            </div>
        </div>`;
}

function createNewTrip() {
    try {
        const name = document.getElementById('newTripName').value.trim();
        const start = document.getElementById('newTripStart').value;
        const end = document.getElementById('newTripEnd').value;
        const destination = document.getElementById('newTripDestination').value.trim();
        const budget = parseFloat(document.getElementById('newTripBudget').value) || 0;
        
        // Validações
        if (!name) { 
            showToast(t('trip_name').replace(' *', ''), 'error'); 
            document.getElementById('newTripName').classList.add('input-error');
            setTimeout(() => document.getElementById('newTripName').classList.remove('input-error'), 3000);
            document.getElementById('newTripName').focus(); 
            return; 
        }
        if (!start) { showToast(t('start_date').replace(' *', ''), 'error'); return; }
        if (!end) { showToast(t('end_date').replace(' *', ''), 'error'); return; }
        if (!destination) { 
            showToast(t('destination').replace(' *', ''), 'error'); 
            document.getElementById('newTripDestination').focus(); 
            return; 
        }
        if (new Date(start) > new Date(end)) { 
            showToast(t('start_before_end'), 'error'); 
            return; 
        }
        
        const destInput = document.getElementById('newTripDestination');
        const numDays = Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)) + 1;
        
        let destLat = parseFloat(destInput.dataset.lat);
        let destLng = parseFloat(destInput.dataset.lng);
        
        if (!destLat || !destLng) {
            if (autocomplete) {
                const place = autocomplete.getPlace();
                if (place && place.geometry && place.geometry.location) {
                    destLat = place.geometry.location.lat();
                    destLng = place.geometry.location.lng();
                }
            }
        }
        
        if (!destLat || !destLng) {
            destLat = 38.7223;
            destLng = -9.1393;
        }
        
        const newTrip = { 
            id: Date.now().toString(), 
            name, 
            destination, 
            destinationLat: destLat, 
            destinationLng: destLng, 
            currency: 'EUR', 
            startDate: start, 
            endDate: end, 
            budget, 
            days: generateDays(start, numDays), 
            places: [], 
            expenses: [], 
            photos: [], 
            checklists: { packing: generateDefaultPackingList(), todo: generateDefaultTodoList() }, 
            notes: '', 
            createdAt: new Date().toISOString() 
        };
        
        trips.push(newTrip);
        saveTripsToStorage();
        updateTripSelector();
        switchTrip(newTrip.id);
        closeNewTripModal();
        
        // Limpar formulário
        document.getElementById('newTripName').value = '';
        document.getElementById('newTripStart').value = '';
        document.getElementById('newTripEnd').value = '';
        document.getElementById('newTripDestination').value = '';
        document.getElementById('newTripBudget').value = '';
        delete destInput.dataset.lat;
        delete destInput.dataset.lng;
        
        showToast('✅ ' + t('trip_created'));
        createConfetti();
    } catch (error) {
        console.error('Erro ao criar viagem:', error);
        showToast('Erro ao criar viagem!', 'error');
    }
}

function generateDefaultPackingList() { 
    return [
        { id: 'p1', text: t('checklist_documents'), checked: false }, 
        { id: 'p2', text: t('checklist_charger'), checked: false }, 
        { id: 'p3', text: t('checklist_underwear'), checked: false }, 
        { id: 'p4', text: t('checklist_toiletries'), checked: false }, 
        { id: 'p5', text: t('checklist_medications'), checked: false }
    ]; 
}

function generateDefaultTodoList() { 
    return [
        { id: 't1', text: t('checklist_confirm_reservations'), checked: false }, 
        { id: 't2', text: t('checklist_online_checkin'), checked: false }, 
        { id: 't3', text: t('checklist_notify_bank'), checked: false }
    ]; 
}

function generateDays(startDate, numDays) {
    const days = [];
    for (let i = 0; i < numDays; i++) { 
        const date = new Date(startDate); 
        date.setDate(date.getDate() + i); 
        days.push({ 
            date: date.toISOString().split('T')[0], 
            color: dayColors[i % dayColors.length], 
            formattedDate: date.toLocaleDateString(
                LANGUAGE_CONFIG.locales[currentLanguage], 
                { weekday: 'short', day: 'numeric', month: 'short' }
            ) 
        }); 
    }
    return days;
}

function switchTrip(tripId) {
    if (!tripId) return;
    currentTrip = trips.find(t => t.id === tripId);
    if (!currentTrip) return;
    document.getElementById('tripSelector').value = tripId;
    
    // Limpar POIs ao mudar de viagem
    clearAllPOIMarkers();
    
    loadChecklists();
    document.getElementById('tripNotes').value = currentTrip.notes || '';
    photos = currentTrip.photos || [];
    renderSidebar();
    updateMapOverlay();
    
    if (mapInitialized && currentTrip.destinationLat) { 
        map.setCenter({ lat: currentTrip.destinationLat, lng: currentTrip.destinationLng }); 
        map.setZoom(13); 
        updateMapMarkers();
        setTimeout(() => calculateAndDisplayRoutes(), 500);
    }
}

// ============================================
// TABS E SIDEBAR
// ============================================
function switchTab(tab) {
    currentTab = tab;
    
    // Atualizar botões
    ['itinerary', 'timeline', 'budget', 'stats'].forEach(t => { 
        const btn = document.getElementById(`tab-${t}`); 
        const bottomBtn = document.querySelector(`.bottom-nav-item[onclick*="'${t}'"]`);
        
        if (t === tab) { 
            btn.classList.add('tab-active', 'text-primary-600'); 
            btn.classList.remove('text-slate-600'); 
            if (bottomBtn) {
                bottomBtn.classList.add('active', 'text-primary-600');
                bottomBtn.classList.remove('text-slate-400');
            }
        } else { 
            btn.classList.remove('tab-active', 'text-primary-600'); 
            btn.classList.add('text-slate-600'); 
            if (bottomBtn) {
                bottomBtn.classList.remove('active', 'text-primary-600');
                bottomBtn.classList.add('text-slate-400');
            }
        } 
    });
    
    // Atualizar indicador
    const indicator = document.getElementById('tabIndicator');
    const activeBtn = document.getElementById(`tab-${tab}`);
    if (indicator && activeBtn) { 
        indicator.style.width = activeBtn.offsetWidth + 'px'; 
        indicator.style.left = activeBtn.offsetLeft + 'px'; 
    }
    
    renderSidebar();
}

function renderSidebar() {
    const container = document.getElementById('sidebar-content');
    if (!container) return;
    
    if (!currentTrip) { 
        showWelcomeState(); 
        return; 
    }
    
    try {
        if (currentTab === 'itinerary') renderItineraryTab(container);
        else if (currentTab === 'timeline') renderTimelineTab(container);
        else if (currentTab === 'budget') renderBudgetTab(container);
        else if (currentTab === 'stats') renderStatsTab(container);
    } catch (error) {
        console.error('Erro ao renderizar sidebar:', error);
    }
}

function renderItineraryTab(container) {
    const dayTotals = calculateDayTotals();
    let html = `
        <div class="mb-4">
            <div class="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-4 text-white shadow-lg">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-primary-100 text-sm">${t('budget_tab')}</span>
                    <span class="text-2xl font-bold">€${dayTotals.grandTotal.toFixed(0)}</span>
                </div>
                <div class="flex justify-between text-xs text-primary-100">
                    <span>${currentTrip.places.length} ${t('places')}</span>
                    <span>${currentTrip.days.length} ${t('days')}</span>
                </div>
                ${currentTrip.budget > 0 ? `
                <div class="mt-3">
                    <div class="flex justify-between text-xs mb-1">
                        <span>${t('budget_label')}</span>
                        <span>${((dayTotals.grandTotal / currentTrip.budget) * 100).toFixed(0)}%</span>
                    </div>
                    <div class="progress-bar bg-primary-700/50">
                        <div class="progress-fill" style="width: ${Math.min((dayTotals.grandTotal / currentTrip.budget) * 100, 100)}%"></div>
                    </div>
                </div>` : ''}
            </div>
        </div>`;
    
    currentTrip.days.forEach((day, dayIndex) => {
        const dayPlaces = currentTrip.places.filter(p => p.dayIndex === dayIndex).sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));
        const dayTotal = dayTotals.byDay[dayIndex] || { total: 0 };
        const isToday = day.date === new Date().toISOString().split('T')[0];
        const dayRouteStats = calculateDayRouteStats(dayIndex);
        
        html += `
        <div class="day-section bg-white rounded-2xl border border-slate-200 mb-3 overflow-hidden shadow-sm card-hover">
            <div class="p-4 flex items-center justify-between cursor-pointer" onclick="toggleDay(${dayIndex})">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-sm" style="background: linear-gradient(135deg, ${day.color}, ${adjustColor(day.color, -20)})">${dayIndex + 1}</div>
                    <div>
                        <div class="font-bold text-slate-800">${t('day')} ${dayIndex + 1}</div>
                        <div class="text-xs ${isToday ? 'text-primary-600 font-semibold' : 'text-slate-500'}">${formatDateShort(day.date)} ${isToday ? '· ' + (currentLanguage === 'pt' ? 'Hoje' : currentLanguage === 'en' ? 'Today' : 'Hoy') : ''}</div>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-600">${dayPlaces.length} ${t('places')}</span>
                    ${dayTotal.total > 0 ? `<span class="text-xs font-bold text-accent-600">€${dayTotal.total.toFixed(0)}</span>` : ''}
                    <i class="fas fa-chevron-down text-slate-400 transition-transform" id="chevron-${dayIndex}"></i>
                </div>
            </div>
            <div id="day-content-${dayIndex}" class="${dayIndex === 0 ? '' : 'hidden'} border-t border-slate-100">
                <!-- Barra de pesquisa do dia -->
                <div class="p-3 border-b border-slate-100">
                    <div class="day-search-container" id="day-search-container-${dayIndex}">
                        <i class="fas fa-search day-search-icon"></i>
                        <input type="text" 
                               id="day-search-input-${dayIndex}" 
                               class="day-search-input" 
                               placeholder="${dayPlaces.length > 0 ? t('search_nearby') : t('search_in_city')}" 
                               autocomplete="off">
                        <div id="day-search-results-${dayIndex}" class="day-search-results hidden"></div>
                    </div>
                </div>
                
                <div class="p-3 space-y-2">
                    ${dayPlaces.length === 0 ? `<div class="text-center py-6 text-slate-400 text-sm">${t('no_places')}</div>` : dayPlaces.map((place, idx) => renderPlaceCardWithRoute(place, idx)).join('')}
                </div>`;
        
        if (dayRouteStats.segments > 0) {
            html += `
                <div class="day-summary mx-3 mb-3">
                    <div class="grid grid-cols-2 gap-2 mt-2">
                        <div class="text-center bg-white rounded-lg p-2">
                            <p class="text-xs text-slate-500">${t('distance')}</p>
                            <p class="font-bold text-slate-700">${(dayRouteStats.distance / 1000).toFixed(1)} km</p>
                        </div>
                        <div class="text-center bg-white rounded-lg p-2">
                            <p class="text-xs text-slate-500">${t('time')}</p>
                            <p class="font-bold text-slate-700">${formatDuration(dayRouteStats.duration)}</p>
                        </div>
                    </div>
                </div>`;
        }
        
        html += `
                <button onclick="event.stopPropagation(); openAddPlaceModal(${dayIndex})" class="w-full py-3 border-t border-dashed border-slate-200 text-slate-500 hover:text-primary-600 hover:bg-primary-50 text-sm font-medium transition flex items-center justify-center gap-2 touch-feedback">
                    <i class="fas fa-plus"></i> ${t('add_place')}
                </button>
            </div>
        </div>`;
    });
    
    container.innerHTML = html;
    
    // Inicializar pesquisa para cada dia
    currentTrip.days.forEach((_, dayIndex) => {
        setTimeout(() => initDaySearch(dayIndex, `day-search-container-${dayIndex}`), 100);
    });
}

function renderPlaceCardWithRoute(place, index) {
    const categoryIcons = { hotel: 'fa-bed', restaurant: 'fa-utensils', attraction: 'fa-camera', flight: 'fa-plane', transport: 'fa-bus', other: 'fa-map-marker-alt' };
    const categoryColors = { hotel: 'purple', restaurant: 'orange', attraction: 'blue', flight: 'indigo', transport: 'slate', other: 'slate' };
    const icon = categoryIcons[place.category] || 'fa-map-marker-alt';
    const color = categoryColors[place.category] || 'slate';
    
    let routeHtml = '';
    if (place.routeFromPrev) {
        const route = place.routeFromPrev;
        const transportClass = route.mode;
        routeHtml = `<div class="route-info ${transportClass} ml-12 mt-1"><i class="fas ${transportConfig[route.mode].icon}" style="color: ${transportConfig[route.mode].color}"></i><span>${route.distanceText} · ${route.durationText}</span>${route.isEstimated ? '<i class="fas fa-info-circle text-slate-400" title="Estimado"></i>' : ''}</div>`;
    }
    
    return `
    <div class="place-item bg-slate-50 rounded-xl p-3 group hover:bg-white hover:shadow-md transition cursor-pointer touch-feedback" onclick="focusOnPlace('${place.id}')">
        <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-lg bg-${color}-100 flex items-center justify-center flex-shrink-0">
                <i class="fas ${icon} text-${color}-500"></i>
            </div>
            <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-slate-800 text-sm truncate">${place.name}</h4>
                <div class="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    ${place.startTime ? `<span><i class="far fa-clock mr-1"></i>${place.startTime}${place.endTime ? ' - ' + place.endTime : ''}</span>` : ''}
                    ${place.transportMode ? `<span class="ml-2" style="color: ${transportConfig[place.transportMode]?.color || '#64748b'}"><i class="fas ${transportConfig[place.transportMode]?.icon || 'fa-walking'} mr-1"></i>${transportConfig[place.transportMode]?.label[currentLanguage] || 'A Pé'}</span>` : ''}
                </div>
                ${place.cost > 0 ? `<span class="inline-block mt-1 text-xs font-medium text-accent-600 bg-accent-50 px-2 py-0.5 rounded-full">€${place.cost.toFixed(0)}</span>` : ''}
            </div>
            <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                <button onclick="event.stopPropagation(); editPlace('${place.id}')" class="w-8 h-8 rounded-lg bg-slate-200 hover:bg-primary-100 flex items-center justify-center text-slate-400 hover:text-primary-600 transition touch-feedback">
                    <i class="fas fa-edit text-xs"></i>
                </button>
                <button onclick="event.stopPropagation(); deletePlace('${place.id}')" class="w-8 h-8 rounded-lg bg-slate-200 hover:bg-red-100 flex items-center justify-center text-slate-400 hover:text-red-600 transition touch-feedback">
                    <i class="fas fa-trash text-xs"></i>
                </button>
            </div>
        </div>
        ${routeHtml}
    </div>`;
}

function formatDuration(seconds) {
    const minutes = Math.round(seconds / 60);
    if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins > 0 ? mins + 'min' : ''}`;
    }
    return `${minutes} min`;
}

function renderTimelineTab(container) {
    if (!currentTrip || currentTrip.places.length === 0) { 
        container.innerHTML = `<div class="text-center py-12 text-slate-400"><i class="fas fa-clock text-4xl mb-3"></i><p>${t('no_places_timeline')}</p></div>`; 
        return; 
    }
    
    const sortedPlaces = [...currentTrip.places].sort((a, b) => { 
        if (a.dayIndex !== b.dayIndex) return a.dayIndex - b.dayIndex; 
        return (a.startTime || '00:00').localeCompare(b.startTime || '00:00'); 
    });
    
    let currentDay = -1;
    let html = '<div class="timeline-container">';
    html += '<div class="timeline-line"></div>';
    
    sortedPlaces.forEach((place) => {
        if (place.dayIndex !== currentDay) { 
            currentDay = place.dayIndex; 
            const day = currentTrip.days[currentDay]; 
            html += `
            <div class="timeline-day-header relative mb-6 mt-4">
                <div class="timeline-dot" style="border-color: ${day.color}"></div>
                <div class="font-display font-bold text-slate-800 text-lg">${t('day')} ${currentDay + 1}</div>
                <div class="text-xs text-slate-500">${formatDateShort(day.date)}</div>
            </div>`; 
        } 
        
        let routeInfoHtml = '';
        if (place.routeFromPrev) {
            const route = place.routeFromPrev;
            routeInfoHtml = `<div class="text-xs text-slate-400 mt-1"><i class="fas ${transportConfig[route.mode].icon} mr-1" style="color: ${transportConfig[route.mode].color}"></i>${route.distanceText} · ${route.durationText}</div>`;
        } 
        
        html += `
        <div class="timeline-item relative mb-5">
            <div class="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                <div class="flex items-center gap-2 mb-2">
                    <span class="text-lg font-mono font-bold text-primary-600">${place.startTime || '--:--'}</span>
                    <span class="text-slate-400">·</span>
                    <span class="font-semibold text-slate-800">${place.name}</span>
                </div>
                ${routeInfoHtml}
                ${place.notes ? `<p class="text-sm text-slate-500 mt-1">${place.notes}</p>` : ''}
            </div>
        </div>`;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

function renderBudgetTab(container) {
    const expenses = currentTrip.expenses || [];
    const placesCost = currentTrip.places.reduce((sum, p) => sum + (parseFloat(p.cost) || 0), 0);
    const totalSpent = expenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0) + placesCost;
    const remaining = (currentTrip.budget || 0) - totalSpent;
    const byCategory = {}; 
    expenses.forEach(e => { byCategory[e.category] = (byCategory[e.category] || 0) + e.amount; }); 
    byCategory.activities = placesCost;
    
    let html = `
    <div class="mb-4">
        <div class="bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl p-4 text-white shadow-lg">
            <div class="flex justify-between items-start mb-3">
                <div>
                    <p class="text-accent-100 text-sm">${t('budget_label')}</p>
                    <h3 class="text-3xl font-bold">€${(currentTrip.budget || 0).toFixed(0)}</h3>
                </div>
                <button onclick="editBudget()" class="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition touch-feedback">
                    <i class="fas fa-edit"></i>
                </button>
            </div>
            <div class="flex justify-between items-center">
                <div>
                    <p class="text-accent-100 text-sm">${t('spent')}</p>
                    <p class="text-xl font-semibold">€${totalSpent.toFixed(0)}</p>
                </div>
                <div class="text-right">
                    <p class="text-accent-100 text-sm">${t('remaining')}</p>
                    <p class="text-xl font-semibold ${remaining < 0 ? 'text-red-300' : ''}">€${remaining.toFixed(0)}</p>
                </div>
            </div>
        </div>
    </div>
    <h4 class="font-semibold text-slate-700 mb-3">${t('by_category')}</h4>
    <div class="space-y-2 mb-6">`;
    
    Object.entries(byCategory).forEach(([cat, amount]) => { 
        const catInfo = expenseCategories[cat] || expenseCategories.other; 
        const percent = totalSpent > 0 ? (amount / totalSpent) * 100 : 0; 
        html += `
        <div class="bg-white rounded-xl p-3 border border-slate-200">
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-${catInfo.color}-100 flex items-center justify-center">
                        <i class="fas ${catInfo.icon} text-${catInfo.color}-500 text-sm"></i>
                    </div>
                    <span class="text-sm font-medium text-slate-700">${catInfo.label[currentLanguage]}</span>
                </div>
                <span class="font-semibold text-slate-800">€${amount.toFixed(0)}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${percent}%; background: var(--color-${catInfo.color}-500, #0ea5e9)"></div>
            </div>
        </div>`; 
    });
    
    html += '</div>';
    
    if (expenses.length > 0) { 
        html += `<h4 class="font-semibold text-slate-700 mb-3">${t('recent_expenses')}</h4><div class="space-y-2">`; 
        expenses.slice(-5).reverse().forEach(e => { 
            const catInfo = expenseCategories[e.category] || expenseCategories.other; 
            html += `
            <div class="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-${catInfo.color}-100 flex items-center justify-center">
                        <i class="fas ${catInfo.icon} text-${catInfo.color}-500"></i>
                    </div>
                    <div>
                        <p class="font-medium text-slate-800 text-sm">${e.description}</p>
                        <p class="text-xs text-slate-500">${formatDateShort(e.date)}</p>
                    </div>
                </div>
                <span class="font-semibold text-slate-800">€${e.amount.toFixed(2)}</span>
            </div>`; 
        }); 
        html += '</div>'; 
    }
    
    container.innerHTML = html;
}

function renderStatsTab(container) {
    const stats = calculateTransportStats();
    
    let html = `<div class="space-y-4">`;
    
    html += `
    <div class="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-4 text-white shadow-lg">
        <h3 class="font-display font-bold text-lg mb-4">${t('trip_summary')}</h3>
        <div class="grid grid-cols-2 gap-4">
            <div class="bg-white/20 rounded-xl p-3">
                <p class="text-primary-100 text-xs">${t('total_distance')}</p>
                <p class="text-2xl font-bold">${stats.total.km.toFixed(1)} km</p>
            </div>
            <div class="bg-white/20 rounded-xl p-3">
                <p class="text-primary-100 text-xs">${t('travel_time')}</p>
                <p class="text-2xl font-bold">${formatDuration(stats.total.time * 60)}</p>
            </div>
            <div class="bg-white/20 rounded-xl p-3">
                <p class="text-primary-100 text-xs">${t('places_visited')}</p>
                <p class="text-2xl font-bold">${currentTrip.places.length}</p>
            </div>
            <div class="bg-white/20 rounded-xl p-3">
                <p class="text-primary-100 text-xs">${t('segments')}</p>
                <p class="text-2xl font-bold">${routeData.length}</p>
            </div>
        </div>
    </div>`;
    
    if (stats.total.km > 0) {
        html += `<h4 class="font-semibold text-slate-700 mb-3">${t('by_transport')}</h4><div class="space-y-2">`;
        
        Object.entries(transportConfig).forEach(([mode, config]) => {
            const modeStats = stats[mode];
            if (modeStats && modeStats.count > 0) {
                const percent = (modeStats.km / stats.total.km) * 100;
                html += `
                <div class="bg-white rounded-xl p-3 border border-slate-200">
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background: ${config.color}20">
                                <i class="fas ${config.icon}" style="color: ${config.color}"></i>
                            </div>
                            <span class="text-sm font-medium text-slate-700">${config.label[currentLanguage]}</span>
                        </div>
                        <span class="font-semibold text-slate-800">${modeStats.km.toFixed(1)} km</span>
                    </div>
                    <div class="flex justify-between text-xs text-slate-500 mb-1">
                        <span>${modeStats.count} ${t('segments')}</span>
                        <span>${formatDuration(modeStats.time * 60)}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percent}%; background: ${config.color}"></div>
                    </div>
                </div>`;
            }
        });
        
        html += `</div>`;
    }
    
    html += `</div>`;
    container.innerHTML = html;
}


// ============================================
// LOCAIS (PLACES)
// ============================================
function openAddPlaceModal(dayIndex = null, placeId = null) {
    if (!currentTrip) {
        showToast(t('create_trip_first'), 'error');
        return;
    }
    
    document.getElementById('addPlaceModal').classList.add('active');
    document.getElementById('modalTitle').textContent = placeId ? t('edit_place') : t('add_to_itinerary');
    document.getElementById('editingPlaceId').value = placeId || '';
    document.getElementById('placeName').value = '';
    document.getElementById('placeAddress').value = '';
    delete document.getElementById('placeAddress').dataset.lat;
    delete document.getElementById('placeAddress').dataset.lng;
    document.getElementById('hotelCheckIn').value = '';
    document.getElementById('hotelCheckOut').value = '';
    document.getElementById('hotelDatesSection').classList.add('hidden');
    document.getElementById('placeTransportMode').value = 'walking';
    
    selectTransport('walking');
    
    const daySelect = document.getElementById('placeDay');
    daySelect.innerHTML = '';
    currentTrip.days.forEach((day, idx) => { 
        const option = document.createElement('option'); 
        option.value = idx; 
        option.textContent = `${t('day')} ${idx + 1} - ${formatDateShort(day.date)}`; 
        if (dayIndex === idx && !placeId) option.selected = true; 
        daySelect.appendChild(option); 
    });
    
    if (placeId) { 
        const place = currentTrip.places.find(p => p.id === placeId); 
        if (place) { 
            document.getElementById('placeName').value = place.name; 
            document.getElementById('placeCategory').value = place.category; 
            document.getElementById('placeDay').value = place.dayIndex; 
            document.getElementById('placeStartTime').value = place.startTime || ''; 
            document.getElementById('placeEndTime').value = place.endTime || ''; 
            document.getElementById('placeCost').value = place.cost || ''; 
            document.getElementById('placeNotes').value = place.notes || ''; 
            document.getElementById('placeAddress').value = place.address || '';
            
            if (place.transportMode) {
                selectTransport(place.transportMode);
            }
            
            if (place.category === 'hotel' && place.hotelDates) { 
                document.getElementById('hotelCheckIn').value = place.hotelDates.checkIn; 
                document.getElementById('hotelCheckOut').value = place.hotelDates.checkOut; 
                document.getElementById('hotelDatesSection').classList.remove('hidden'); 
            } 
            onCategoryChange(); 
        } 
    }
    setTimeout(initAddressAutocomplete, 100);
}

function closeAddPlaceModal() { 
    document.getElementById('addPlaceModal').classList.remove('active'); 
}

function savePlace() {
    const name = document.getElementById('placeName').value.trim();
    const category = document.getElementById('placeCategory').value;
    const dayIndex = parseInt(document.getElementById('placeDay').value);
    const cost = parseFloat(document.getElementById('placeCost').value) || 0;
    const transportMode = document.getElementById('placeTransportMode').value;
    const startTime = document.getElementById('placeStartTime').value;
    const endTime = document.getElementById('placeEndTime').value;
    
    if (!name) { 
        showToast(t('place').replace(' *', ''), 'error'); 
        document.getElementById('placeName').classList.add('input-error');
        setTimeout(() => document.getElementById('placeName').classList.remove('input-error'), 3000);
        return; 
    }
    
    const addressInput = document.getElementById('placeAddress');
    const placeData = { 
        id: document.getElementById('editingPlaceId').value || Date.now().toString(), 
        name, 
        category, 
        dayIndex, 
        startTime: startTime, 
        endTime: endTime, 
        cost, 
        transportMode,
        notes: document.getElementById('placeNotes').value, 
        address: addressInput.value, 
        lat: addressInput.dataset.lat ? parseFloat(addressInput.dataset.lat) : null, 
        lng: addressInput.dataset.lng ? parseFloat(addressInput.dataset.lng) : null, 
        color: currentTrip.days[dayIndex].color 
    };
    
    if (category === 'hotel') { 
        const checkIn = document.getElementById('hotelCheckIn').value; 
        const checkOut = document.getElementById('hotelCheckOut').value; 
        if (checkIn && checkOut) placeData.hotelDates = { checkIn, checkOut }; 
    }
    
    const isEditing = document.getElementById('editingPlaceId').value;
    
    if (isEditing) { 
        const existingPlace = currentTrip.places.find(p => p.id === placeData.id);
        if (existingPlace && existingPlace.routeFromPrev) {
            placeData.routeFromPrev = existingPlace.routeFromPrev;
        }
        const index = currentTrip.places.findIndex(p => p.id === placeData.id); 
        if (index !== -1) currentTrip.places[index] = placeData; 
    } else { 
        currentTrip.places.push(placeData); 
    }
    
    // Reordenar lugares do dia por hora de início (cronológico)
    const dayPlacesToSort = currentTrip.places.filter(p => p.dayIndex === dayIndex);
    dayPlacesToSort.sort((a, b) => (a.startTime || '00:00').localeCompare(b.startTime || '00:00'));
    
    // Atualizar a ordem no array principal
    const otherPlaces = currentTrip.places.filter(p => p.dayIndex !== dayIndex);
    currentTrip.places = [...otherPlaces, ...dayPlacesToSort];
    
    saveTripsToStorage();
    closeAddPlaceModal();
    renderSidebar();
    updateMapMarkers();
    updateMapOverlay();
    setTimeout(() => calculateAndDisplayRoutes(), 300);
    showToast(isEditing ? t('updated') : t('added'));
}

function editPlace(placeId) {
    const place = currentTrip.places.find(p => p.id === placeId);
    if (place) {
        openAddPlaceModal(place.dayIndex, placeId);
    }
}

function deletePlace(placeId) { 
    if (confirm(t('confirm_delete'))) { 
        currentTrip.places = currentTrip.places.filter(p => p.id !== placeId); 
        saveTripsToStorage(); 
        renderSidebar(); 
        updateMapMarkers(); 
        updateMapOverlay();
        setTimeout(() => calculateAndDisplayRoutes(), 300);
        showToast(t('removed')); 
    } 
}

function focusOnPlace(placeId) {
    if (!map || !currentTrip) return;
    const place = currentTrip.places.find(p => p.id === placeId);
    if (!place || !place.lat || !place.lng) return;

    // Criar objeto LatLng para o centro
    const latLng = new google.maps.LatLng(place.lat, place.lng);

    // Centrar o mapa com animação suave
    map.panTo(latLng);
    map.setZoom(17);

    // Encontrar o marcador correspondente (com tolerância maior)
    const marker = markers.find(m => { 
        const pos = m.getPosition();
        if (!pos) return false;
        const latDiff = Math.abs(pos.lat() - place.lat);
        const lngDiff = Math.abs(pos.lng() - place.lng);
        // Tolerância de ~11 metros (0.0001 graus ≈ 11m)
        return latDiff < 0.001 && lngDiff < 0.001;
    });

    if (marker) { 
        marker.setAnimation(google.maps.Animation.BOUNCE); 
        setTimeout(() => marker.setAnimation(null), 2000); 
    }
}

function selectTransport(mode) {
    document.getElementById('placeTransportMode').value = mode;
    document.querySelectorAll('.transport-option').forEach(el => {
        el.classList.remove('selected');
    });
    const selected = document.querySelector(`[data-transport="${mode}"]`);
    if (selected) selected.classList.add('selected');
}

function onCategoryChange() { 
    const category = document.getElementById('placeCategory').value; 
    const hotelSection = document.getElementById('hotelDatesSection'); 
    if (category === 'hotel') { 
        hotelSection.classList.remove('hidden'); 
        if (currentTrip) { 
            document.getElementById('hotelCheckIn').min = currentTrip.startDate; 
            document.getElementById('hotelCheckIn').max = currentTrip.endDate; 
            document.getElementById('hotelCheckOut').min = currentTrip.startDate; 
            document.getElementById('hotelCheckOut').max = currentTrip.endDate; 
        } 
    } else { 
        hotelSection.classList.add('hidden'); 
    } 
}

function updateHotelDates() { 
    const checkIn = document.getElementById('hotelCheckIn').value; 
    const checkOut = document.getElementById('hotelCheckOut').value; 
    const infoElement = document.getElementById('hotelDatesInfo'); 
    if (checkIn && checkOut) { 
        const start = new Date(checkIn); 
        const end = new Date(checkOut); 
        const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); 
        if (end <= start) { 
            infoElement.textContent = '⚠️ ' + t('checkin_after_checkout'); 
            infoElement.className = 'text-xs text-red-500'; 
        } else { 
            infoElement.textContent = `✓ ${diffDays} ${t('nights')}`; 
            infoElement.className = 'text-xs text-accent-600'; 
        } 
    } 
}

function updateMapMarkers() {
    if (!map || !google || !google.maps) return;
    
    // Clear existing markers
    markers.forEach(m => {
        if (m && m.setMap) m.setMap(null);
    });
    markers = [];
    
    if (!currentTrip || !currentTrip.places) return;
    
    try {
        const bounds = new google.maps.LatLngBounds();
        currentTrip.places.forEach((place, index) => {
            if (place && place.lat && place.lng) {
                const position = { lat: place.lat, lng: place.lng };
                const markerColor = place.color || dayColors[(place.dayIndex || 0) % dayColors.length];
                const marker = new google.maps.Marker({ 
                    position, 
                    map, 
                    title: place.name || '', 
                    label: { text: (index + 1).toString(), color: 'white', fontSize: '12px', fontWeight: 'bold' }, 
                    icon: { path: google.maps.SymbolPath.CIRCLE, scale: 14, fillColor: markerColor, fillOpacity: 1, strokeWeight: 3, strokeColor: '#fff' } 
                });
                
                const transportMode = place.transportMode || 'walking';
                const transportConfig = window.transportConfig || {};
                const transportLabel = transportConfig[transportMode]?.label?.[currentLanguage] || 'A Pé';
                const transportIcon = transportConfig[transportMode]?.icon || 'fa-walking';
                
                const infoWindow = new google.maps.InfoWindow({ 
                    content: `<div style="padding: 8px; max-width: 200px;"><h3 style="font-weight: bold; margin: 0 0 4px 0;">${escapeHtml(place.name)}</h3>${place.startTime ? `<p style="font-size: 12px; color: #666; margin: 0;"><i class="far fa-clock"></i> ${place.startTime}</p>` : ''}${place.cost > 0 ? `<p style="font-size: 12px; color: #10b981; margin: 4px 0 0 0; font-weight: bold;">€${place.cost.toFixed(0)}</p>` : ''}${place.transportMode ? `<p style="font-size: 11px; color: #64748b; margin: 4px 0 0 0;"><i class="fas ${transportIcon}"></i> ${transportLabel}</p>` : ''}</div>` 
                });
                
                marker.addListener('click', () => infoWindow.open(map, marker));
                markers.push(marker);
                bounds.extend(position);
            }
        });
        
        if (markers.length > 0) { 
            map.fitBounds(bounds); 
            if (markers.length === 1) map.setZoom(15); 
        }
    } catch (error) {
        console.error('Erro ao atualizar marcadores:', error);
    }
}

// ============================================
// DESPESAS (EXPENSES)
// ============================================
function openQuickExpenseModal() { 
    if (!currentTrip) { 
        showToast(t('create_trip_first'), 'error'); 
        return; 
    } 
    document.getElementById('quickExpenseModal').classList.add('active'); 
    document.getElementById('quickExpenseDesc').value = ''; 
    document.getElementById('quickExpenseAmount').value = ''; 
    currentExpenseCategory = 'other'; 
    updateExpenseCategoryButtons(); 
}

function closeQuickExpenseModal() { 
    document.getElementById('quickExpenseModal').classList.remove('active'); 
}

function setExpenseCategory(cat) { 
    currentExpenseCategory = cat; 
    updateExpenseCategoryButtons(); 
}

function updateExpenseCategoryButtons() { 
    document.querySelectorAll('.expense-cat-btn').forEach(btn => { 
        if (btn.dataset.cat === currentExpenseCategory) {
            btn.classList.add('ring-2', 'ring-primary-500', 'bg-primary-50'); 
        } else {
            btn.classList.remove('ring-2', 'ring-primary-500', 'bg-primary-50'); 
        }
    }); 
}

function saveQuickExpense() {
    const desc = document.getElementById('quickExpenseDesc').value.trim();
    const amount = parseFloat(document.getElementById('quickExpenseAmount').value);
    
    if (!desc || !amount) { 
        showToast(t('fill_desc_amount'), 'error'); 
        return; 
    }
    
    if (!currentTrip.expenses) currentTrip.expenses = [];
    currentTrip.expenses.push({ 
        id: Date.now().toString(), 
        description: desc, 
        amount, 
        category: currentExpenseCategory, 
        date: new Date().toISOString() 
    });
    
    saveTripsToStorage();
    closeQuickExpenseModal();
    renderSidebar();
    updateMapOverlay();
    showToast(t('expense_registered'));
}

function editBudget() { 
    const newBudget = prompt(t('budget_label') + ' (€):', currentTrip.budget || ''); 
    if (newBudget !== null) { 
        currentTrip.budget = parseFloat(newBudget) || 0; 
        saveTripsToStorage(); 
        renderSidebar(); 
        updateMapOverlay(); 
        showToast(t('budget_label') + ' ' + t('updated')); 
    } 
}

// ============================================
// CHECKLISTS
// ============================================
function loadChecklists() {
    if (!currentTrip) return;
    
    // Atualizar traduções dos itens padrão
    updateChecklistTranslations();
    
    const packingList = document.getElementById('packingList');
    const todoList = document.getElementById('todoList');
    if (packingList) packingList.innerHTML = (currentTrip.checklists?.packing || []).map(item => createChecklistItemHTML(item, 'packing')).join('');
    if (todoList) todoList.innerHTML = (currentTrip.checklists?.todo || []).map(item => createChecklistItemHTML(item, 'todo')).join('');
}

function updateChecklistTranslations() {
    if (!currentTrip || !currentTrip.checklists) return;
    
    // Mapear chaves de tradução para os itens padrão
    const packingKeys = [
        'checklist_documents',
        'checklist_charger',
        'checklist_underwear',
        'checklist_toiletries',
        'checklist_medications'
    ];
    
    const todoKeys = [
        'checklist_confirm_reservations',
        'checklist_online_checkin',
        'checklist_notify_bank'
    ];
    
    // Atualizar itens de packing
    if (currentTrip.checklists.packing) {
        currentTrip.checklists.packing.forEach((item, index) => {
            if (packingKeys[index]) {
                item.text = t(packingKeys[index]);
            }
        });
    }
    
    // Atualizar itens de todo
    if (currentTrip.checklists.todo) {
        currentTrip.checklists.todo.forEach((item, index) => {
            if (todoKeys[index]) {
                item.text = t(todoKeys[index]);
            }
        });
    }
}

function createChecklistItemHTML(item, type) { 
    return `
    <li class="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 ${item.checked ? 'opacity-50' : ''} transition">
        <input type="checkbox" ${item.checked ? 'checked' : ''} onchange="toggleChecklistItem('${type}', '${item.id}')" class="w-5 h-5 text-primary-600 rounded border-slate-300 focus:ring-primary-500 cursor-pointer">
        <span class="text-sm text-slate-700 flex-1 ${item.checked ? 'line-through' : ''}">${item.text}</span>
        <button onclick="deleteChecklistItem('${type}', '${item.id}')" class="text-slate-300 hover:text-red-500 transition touch-feedback">
            <i class="fas fa-times"></i>
        </button>
    </li>`; 
}

function addChecklistItem(type) { 
    const text = prompt(t('new_item')); 
    if (text) { 
        if (!currentTrip.checklists[type]) currentTrip.checklists[type] = []; 
        currentTrip.checklists[type].push({ id: Date.now().toString(), text, checked: false }); 
        saveTripsToStorage(); 
        loadChecklists(); 
        showToast(t('item_added')); 
    } 
}

function toggleChecklistItem(type, itemId) { 
    const item = currentTrip.checklists[type].find(i => i.id === itemId); 
    if (item) { 
        item.checked = !item.checked; 
        saveTripsToStorage(); 
        loadChecklists(); 
    } 
}

function deleteChecklistItem(type, itemId) { 
    currentTrip.checklists[type] = currentTrip.checklists[type].filter(i => i.id !== itemId); 
    saveTripsToStorage(); 
    loadChecklists(); 
}

function saveNotes() { 
    if (currentTrip) { 
        currentTrip.notes = document.getElementById('tripNotes').value; 
        saveTripsToStorage(); 
    } 
}

// ============================================
// MEMÓRIAS (PHOTOS)
// ============================================
function openMemoryModal() { 
    if (!currentTrip) { 
        showToast(t('create_trip_first'), 'error'); 
        return; 
    } 
    document.getElementById('memoryModal').classList.add('active'); 
    renderPhotoGallery(); 
}

function closeMemoryModal() { 
    document.getElementById('memoryModal').classList.remove('active'); 
}

function handlePhotoUpload(input) {
    if (!input.files.length) return;
    Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => { 
            photos.push({ 
                id: Date.now().toString() + Math.random(), 
                src: e.target.result, 
                date: new Date().toISOString() 
            }); 
            currentTrip.photos = photos; 
            saveTripsToStorage(); 
            renderPhotoGallery(); 
        };
        reader.readAsDataURL(file);
    });
    showToast(`${input.files.length} ${t('photos_added')}`);
}

function renderPhotoGallery() { 
    const gallery = document.getElementById('photoGallery'); 
    if (photos.length === 0) { 
        gallery.innerHTML = `<p class="text-center text-slate-400 py-8">${t('no_photos')}</p>`; 
        return; 
    } 
    gallery.innerHTML = photos.map(photo => `
        <div class="relative aspect-square rounded-xl overflow-hidden group">
            <img src="${photo.src}" class="w-full h-full object-cover" alt="Memory">
            <button onclick="deletePhoto('${photo.id}')" class="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center touch-feedback">
                <i class="fas fa-trash text-xs"></i>
            </button>
        </div>
    `).join(''); 
}

function deletePhoto(photoId) { 
    photos = photos.filter(p => p.id !== photoId); 
    currentTrip.photos = photos; 
    saveTripsToStorage(); 
    renderPhotoGallery(); 
}


// ============================================
// EXPORTAR / IMPORTAR / PARTILHAR
// ============================================
function openExportModal() { 
    if (!currentTrip) { 
        showToast(t('select_trip_first'), 'error'); 
        return; 
    } 
    document.getElementById('exportModal').classList.add('active'); 
}

function closeExportModal() { 
    document.getElementById('exportModal').classList.remove('active'); 
}

function openImportModal() { 
    document.getElementById('importModal').classList.add('active'); 
}

function closeImportModal() { 
    document.getElementById('importModal').classList.remove('active'); 
}

function exportToFile() {
    if (!currentTrip) {
        showToast(t('select_trip_first'), 'error');
        return;
    }
    
    try {
        // Validate JSON before creating blob
        const dataStr = JSON.stringify(currentTrip, null, 2);
        if (!dataStr || dataStr === '{}') {
            throw new Error('Invalid trip data');
        }
        
        // Create blob with proper MIME type
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        // Create and configure download link
        const link = document.createElement('a');
        
        // Sanitize filename for cross-browser compatibility
        const safeName = (currentTrip.name || 'trip').replace(/[^a-zA-Z0-9\u00C0-\u017F\s]/g, '-').replace(/\s+/g, '-').toLowerCase();
        const timestamp = new Date().toISOString().slice(0, 10);
        const filename = `totravel-${safeName}-${timestamp}.json`;
        
        link.href = url;
        link.download = filename;
        
        // Append, click, and remove link
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        setTimeout(() => {
            if (link.parentNode) {
                document.body.removeChild(link);
            }
            URL.revokeObjectURL(url);
        }, 100);
        
        closeExportModal();
        showToast('✅ ' + t('saved'));
    } catch (error) {
        console.error('Erro ao exportar:', error);
        showToast('Erro ao guardar ficheiro!', 'error');
    }
}

// Helper function to safely encode Unicode strings to Base64
function utf8ToBase64(str) {
    const utf8Bytes = new TextEncoder().encode(str);
    const base64String = btoa(String.fromCharCode(...utf8Bytes));
    return base64String;
}

// Helper function to safely decode Base64 to Unicode strings
function base64ToUtf8(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
}

function shareTrip() {
    if (!currentTrip) {
        showToast(t('select_trip_first'), 'error');
        return;
    }
    
    try {
        // Validate trip data before encoding
        if (!currentTrip.id || !currentTrip.name) {
            showToast('Dados da viagem inválidos!', 'error');
            return;
        }
        
        const jsonStr = JSON.stringify(currentTrip);
        if (!jsonStr || jsonStr === '{}') {
            showToast('Erro ao processar dados da viagem!', 'error');
            return;
        }
        
        const encodedData = utf8ToBase64(jsonStr);
        
        // Build share URL
        const baseUrl = window.location.origin + window.location.pathname;
        const shareUrl = `${baseUrl}?trip=${encodedData}`;
        
        // Check URL length limit
        if (shareUrl.length > 8000) {
            showToast(t('trip_too_large'), 'error');
            return;
        }
        
        // Try native share API first (mobile)
        if (navigator.share && /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)) { 
            navigator.share({ 
                title: `ToTravel - ${currentTrip.name}`, 
                text: `${t('check_itinerary')} ${currentTrip.destination}!`, 
                url: shareUrl 
            }).then(() => {
                closeExportModal();
                showToast(t('link_shared'));
            }).catch((err) => {
                // User cancelled or share failed, fallback to clipboard
                if (err.name !== 'AbortError') {
                    copyToClipboard(shareUrl);
                }
            });
        } else { 
            // Desktop: copy to clipboard
            copyToClipboard(shareUrl);
        }
    } catch (error) {
        console.error('Erro ao gerar link:', error);
        showToast('Erro ao gerar link!', 'error');
    }
}

// Helper function to copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            closeExportModal();
            showToast(t('link_copied'));
        }).catch(() => {
            // Fallback for browsers without clipboard API
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

// Fallback copy method using textarea
function fallbackCopyToClipboard(text) {
    try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        
        if (successful) {
            closeExportModal();
            showToast(t('link_copied'));
        } else {
            prompt(t('copy_link'), text);
            closeExportModal();
        }
    } catch (err) {
        prompt(t('copy_link'), text);
        closeExportModal();
    }
}

function exportToPDF() {
    if (!currentTrip) {
        showToast(t('select_trip_first'), 'error');
        return;
    }
    
    try {
        const element = document.createElement('div');
        element.innerHTML = generatePDFContent();
        element.style.padding = '20px';
        element.style.fontFamily = 'Inter, sans-serif';
        element.style.background = 'white';
        
        const opt = { 
            margin: [10, 10, 10, 10], 
            filename: `totravel-${currentTrip.name.replace(/[^a-z0-9]/gi, '-')}.pdf`, 
            image: { type: 'jpeg', quality: 0.98 }, 
            html2canvas: { scale: 2, useCORS: true, letterRendering: true }, 
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { 
                mode: ['avoid-all', 'css', 'legacy'],
                before: '.page-break-before',
                after: '.page-break-after',
                avoid: ['.day-section', '.place-item', 'tr', 'img']
            }
        };
        
        html2pdf().set(opt).from(element).save();
        closeExportModal();
        showToast('📄 PDF ' + t('generating'));
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        showToast('Erro ao gerar PDF!', 'error');
    }
}

function generatePDFContent() {
    const totalSpent = calculateTotalExpenses();
    const stats = calculateTransportStats();
    
    let html = `
    <style>
        * { font-family: 'Inter', Arial, sans-serif; box-sizing: border-box; }
        body { margin: 0; padding: 0; line-height: 1.4; }
        .day-section { page-break-inside: avoid !important; break-inside: avoid !important; margin-bottom: 15px; }
        .place-item { page-break-inside: avoid !important; break-inside: avoid !important; margin-bottom: 8px; }
        .page-break-before { page-break-before: always; }
        .header { text-align: center; padding: 20px 0; border-bottom: 3px solid #0ea5e9; margin-bottom: 20px; }
        .header h1 { font-size: 28px; color: #0ea5e9; margin: 0; }
        .header p { font-size: 14px; color: #64748b; margin: 5px 0; }
        .summary { margin-bottom: 20px; }
        .summary-grid { display: flex; gap: 20px; margin: 15px 0; flex-wrap: wrap; }
        .summary-item { flex: 1; min-width: 120px; }
        .day-header { color: #0ea5e9; font-size: 16px; font-weight: bold; margin: 15px 0 10px 0; padding-bottom: 5px; border-bottom: 1px solid #e2e8f0; }
        .place-row { padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
        .place-time { font-weight: bold; color: #0ea5e9; }
        .place-cost { color: #10b981; font-weight: bold; float: right; }
        .route-info { font-size: 10px; color: #94a3b8; margin: 3px 0 0 20px; }
        .footer { text-align: center; padding: 20px 0; color: #94a3b8; font-size: 10px; margin-top: 30px; border-top: 1px solid #e2e8f0; }
    </style>
    <div class="header">
        <h1>${escapeHtml(currentTrip.name)}</h1>
        <p>${escapeHtml(currentTrip.destination)}</p>
        <p>${formatDate(currentTrip.startDate)} - ${formatDate(currentTrip.endDate)}</p>
    </div>
    
    <div class="summary">
        <h2 style="color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">${t('summary')}</h2>
        <div class="summary-grid">
            <div class="summary-item"><strong>${t('duration')}:</strong> ${currentTrip.days.length} ${t('days')}</div>
            <div class="summary-item"><strong>${t('places')}:</strong> ${currentTrip.places.length}</div>
            <div class="summary-item"><strong>${t('budget_label')}:</strong> €${(currentTrip.budget || 0).toFixed(0)}</div>
            <div class="summary-item"><strong>${t('spent')}:</strong> €${totalSpent.toFixed(0)}</div>
        </div>
        ${stats.total.km > 0 ? `<p><strong>${t('total_distance')}:</strong> ${stats.total.km.toFixed(1)} km | <strong>${t('time')}:</strong> ${formatDuration(stats.total.time * 60)}</p>` : ''}
    </div>
    
    <h2 style="color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">${t('itinerary')}</h2>`;
    
    currentTrip.days.forEach((day, idx) => { 
        const dayPlaces = currentTrip.places.filter(p => p.dayIndex === idx).sort((a, b) => (a.startTime || '').localeCompare(b.startTime || '')); 
        const dayStats = calculateDayRouteStats(idx);
        
        if (idx > 0 && idx % 3 === 0) {
            html += `<div class="page-break-before"></div>`;
        }
        
        html += `<div class="day-section">`;
        html += `<div class="day-header">${t('day')} ${idx + 1} - ${formatDateShort(day.date)}`;
        if (dayStats.segments > 0) {
            html += ` <span style="font-size: 11px; color: #64748b; font-weight: normal;">(${formatDuration(dayStats.duration)} · ${(dayStats.distance/1000).toFixed(1)}km)</span>`;
        }
        html += `</div>`;
        
        if (dayPlaces.length === 0) {
            html += `<p style="color: #94a3b8; font-style: italic;">${t('no_places')}</p>`;
        } else {
            dayPlaces.forEach(p => {
                html += `<div class="place-item">`;
                html += `<div class="place-row">`;
                html += `<span class="place-time">${p.startTime || '--:--'}</span> - ${escapeHtml(p.name)}`;
                if (p.cost > 0) html += `<span class="place-cost">€${p.cost.toFixed(0)}</span>`;
                html += `</div>`;
                
                if (p.routeFromPrev) {
                    html += `<div class="route-info">`;
                    html += `${p.routeFromPrev.distanceText} · ${p.routeFromPrev.durationText}`;
                    html += `</div>`;
                }
                
                if (p.notes) html += `<p style="color: #64748b; font-size: 11px; margin: 3px 0 0 20px;">${escapeHtml(p.notes)}</p>`;
                html += `</div>`;
            });
        }
        html += `</div>`;
    });
    
    html += `<div class="footer">${t('generated_by')} - ${t('tagline')}</div>`;
    
    return html;
}

function importFromFile(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) { 
        try { 
            importTrip(JSON.parse(e.target.result)); 
        } catch (error) { 
            showToast('Erro ao ler ficheiro!', 'error'); 
        } 
    };
    reader.readAsText(file);
}

function importFromText() {
    const text = document.getElementById('importText').value;
    if (!text.trim()) { 
        showToast(t('paste_first'), 'error'); 
        return; 
    }
    try { 
        importTrip(JSON.parse(text)); 
    } catch (error) { 
        showToast('Erro ao importar!', 'error'); 
    }
}

function importTrip(tripData) {
    if (!tripData.name) { showToast('Dados inválidos!', 'error'); return; }
    tripData.id = Date.now().toString();
    trips.push(tripData);
    saveTripsToStorage();
    updateTripSelector();
    switchTrip(tripData.id);
    closeImportModal();
    showToast('✅ ' + t('imported'));
}

// ============================================
// UTILITÁRIOS
// ============================================
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateStr) { 
    try {
        return new Date(dateStr).toLocaleDateString(
            LANGUAGE_CONFIG.locales[currentLanguage], 
            { day: 'numeric', month: 'long', year: 'numeric' }
        ); 
    } catch (e) {
        return dateStr;
    }
}

function formatDateShort(dateStr) { 
    try {
        return new Date(dateStr).toLocaleDateString(
            LANGUAGE_CONFIG.locales[currentLanguage], 
            { weekday: 'short', day: 'numeric', month: 'short' }
        ); 
    } catch (e) {
        return dateStr;
    }
}

function adjustColor(color, amount) { 
    const num = parseInt(color.replace('#', ''), 16); 
    const r = Math.max(0, Math.min(255, (num >> 16) + amount)); 
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount)); 
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount)); 
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`; 
}

function calculateDayTotals() { 
    const byDay = {}; 
    let grandTotal = 0; 
    currentTrip.places.forEach(place => { 
        const dayIndex = place.dayIndex; 
        if (!byDay[dayIndex]) byDay[dayIndex] = { total: 0 }; 
        byDay[dayIndex].total += parseFloat(place.cost) || 0; 
        grandTotal += parseFloat(place.cost) || 0; 
    }); 
    return { byDay, grandTotal }; 
}

function calculateTotalExpenses() { 
    const placesCost = currentTrip.places.reduce((sum, p) => sum + (parseFloat(p.cost) || 0), 0); 
    const expensesCost = (currentTrip.expenses || []).reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0); 
    return placesCost + expensesCost; 
}

function saveTripsToStorage() { 
    try {
        localStorage.setItem('totravel_trips', JSON.stringify(trips)); 
    } catch (e) {
        console.error('Erro ao guardar:', e);
    }
}

function loadTripsFromStorage() { 
    try {
        const stored = localStorage.getItem('totravel_trips'); 
        if (stored) trips = JSON.parse(stored); 
    } catch (e) {
        console.error('Erro ao carregar:', e);
        trips = [];
    }
}

function updateTripSelector() { 
    const selector = document.getElementById('tripSelector'); 
    selector.innerHTML = `<option value="">${t('select_trip')}</option>`; 
    trips.forEach(trip => { 
        const option = document.createElement('option'); 
        option.value = trip.id; 
        option.textContent = `${trip.name} · ${trip.destination}`; 
        selector.appendChild(option); 
    }); 
}

function toggleDay(dayIndex) { 
    const content = document.getElementById(`day-content-${dayIndex}`); 
    const chevron = document.getElementById(`chevron-${dayIndex}`); 
    if (content.classList.contains('hidden')) { 
        content.classList.remove('hidden'); 
        chevron.style.transform = 'rotate(180deg)'; 
    } else { 
        content.classList.add('hidden'); 
        chevron.style.transform = 'rotate(0deg)'; 
    } 
}

function showToast(message, type = 'success') { 
    const toast = document.getElementById('toast'); 
    toast.textContent = message; 
    toast.className = 'toast ' + type;
    toast.classList.add('show'); 
    setTimeout(() => toast.classList.remove('show'), 3000); 
}

function createConfetti() { 
    const colors = ['#0ea5e9', '#10b981', '#f97316', '#8b5cf6', '#ef4444']; 
    for (let i = 0; i < 30; i++) { 
        const confetti = document.createElement('div'); 
        confetti.className = 'confetti'; 
        confetti.style.left = Math.random() * 100 + 'vw'; 
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)]; 
        confetti.style.animationDelay = Math.random() * 2 + 's'; 
        document.body.appendChild(confetti); 
        setTimeout(() => confetti.remove(), 3000); 
    } 
}

function setupOfflineDetection() { 
    const indicator = document.getElementById('offlineIndicator'); 
    function updateOnlineStatus() { 
        if (navigator.onLine) indicator.classList.add('hidden'); 
        else indicator.classList.remove('hidden'); 
    } 
    window.addEventListener('online', updateOnlineStatus); 
    window.addEventListener('offline', updateOnlineStatus); 
    updateOnlineStatus(); 
}

function updateEndDateMin() { 
    const endInput = document.getElementById('newTripEnd');
    const startInput = document.getElementById('newTripStart');
    if (endInput && startInput) {
        endInput.min = startInput.value; 
    }
}

function openNewTripModal() {
    document.getElementById('newTripModal').classList.add('active');
    const today = new Date().toISOString().split('T')[0];
    const startInput = document.getElementById('newTripStart');
    const endInput = document.getElementById('newTripEnd');
    
    if (startInput) {
        startInput.min = today;
        startInput.value = today;
    }
    if (endInput) {
        endInput.min = today;
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        endInput.value = nextWeek.toISOString().split('T')[0];
    }
    
    if (!autocomplete) initNewTripAutocomplete();
}

function closeNewTripModal() { 
    document.getElementById('newTripModal').classList.remove('active'); 
}

// ============================================
// AUTOCOMPLETE (Google Places)
// ============================================
function initNewTripAutocomplete() {
    try {
        const input = document.getElementById('newTripDestination');
        if (!input) return;
        
        if (!window.google?.maps?.places) {
            input.addEventListener('blur', function() {
                if (!input.dataset.lat && input.value) {
                    input.dataset.lat = '38.7223';
                    input.dataset.lng = '-9.1393';
                }
            });
            return;
        }
        
        autocomplete = new google.maps.places.Autocomplete(input, { 
            types: ['(cities)'], 
            fields: ['geometry', 'name', 'formatted_address'] 
        });
        
        autocomplete.addListener('place_changed', function() { 
            const place = autocomplete.getPlace(); 
            if (place && place.geometry && place.geometry.location) { 
                input.dataset.lat = place.geometry.location.lat(); 
                input.dataset.lng = place.geometry.location.lng(); 
            } 
        });
    } catch (error) {
        console.error('Erro ao inicializar autocomplete:', error);
    }
}

function initAddressAutocomplete() {
    try {
        const input = document.getElementById('placeAddress');
        if (!input || addressAutocomplete || !window.google?.maps?.places) return;
        
        addressAutocomplete = new google.maps.places.Autocomplete(input, { 
            types: ['establishment', 'geocode'], 
            fields: ['formatted_address', 'geometry', 'name'] 
        });
        
        addressAutocomplete.addListener('place_changed', function() { 
            const place = addressAutocomplete.getPlace(); 
            if (place && place.geometry && place.geometry.location) { 
                input.dataset.lat = place.geometry.location.lat(); 
                input.dataset.lng = place.geometry.location.lng(); 
                if (!document.getElementById('placeName').value && place.name) {
                    document.getElementById('placeName').value = place.name; 
                }
            } 
        });
    } catch (error) {
        console.error('Erro ao inicializar address autocomplete:', error);
    }
}

// ============================================
// EXPORTAR FUNÇÕES PARA ESCOPO GLOBAL
// ============================================
window.updateChecklistTranslations = updateChecklistTranslations;
window.loadChecklists = loadChecklists;
window.toggleGeolocation = toggleGeolocation;
window.toggleFollowLocation = toggleFollowLocation;

// ============================================
// EVENT LISTENERS
// ============================================
// Verificar trip partilhada no URL
window.addEventListener('load', () => {
    const params = new URLSearchParams(window.location.search);
    const sharedTrip = params.get('trip');
    if (sharedTrip) { 
        try { 
            const decoded = base64ToUtf8(sharedTrip);
            importTrip(JSON.parse(decoded)); 
            window.history.replaceState({}, document.title, window.location.pathname); 
        } catch (e) { 
            console.error('Invalid shared trip data', e); 
        } 
    }
});