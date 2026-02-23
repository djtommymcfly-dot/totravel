/**
 * ============================================
 * TOTRAVEL - SISTEMA DE TRADUÇÃO i18n
 * ============================================
 * Suporte: Português (PT), English (EN), Español (ES)
 * 
 * Estrutura organizada por categorias funcionais
 */

const TRANSLATIONS = {
    // ============================================
    // PORTUGUÊS (PT) - Idioma padrão
    // ============================================
    pt: {
        // ----- Seleção de Idioma (Primeira Ação) -----
        select_language: "Seleciona o teu idioma",
        choose_language: "Escolhe o idioma para começar",
        language_changed: "Idioma alterado!",
        
        // ----- Mapa - Visões -----
        map_view: "Visão do Mapa",
        terrain: "Terreno",
        satellite: "Satélite",
        search_nearby: "Procurar perto...",
        search_in_city: "Procurar na cidade...",
        add_to_day: "Adicionar ao Dia",
        click_map_add: "Clica no mapa para adicionar",
        
        // ----- POIs -----
        restaurants: "Restaurantes",
        attractions: "Atrações",
        museums: "Museus",
        public_transport: "Transportes",
        pharmacies: "Farmácias",
        atm: "Multibanco",
        hotels: "Hotéis",
        
        // ----- Geolocalização -----
        my_location: "A Minha Localização",
        follow_location: "Seguir Posição",
        stop_following: "Parar de Seguir",
        location_active: "Localização ativa",
        location_denied: "Permissão de localização negada",
        
        // ----- Checklist Items -----
        checklist_documents: "Documentos (CC, Passaporte)",
        checklist_charger: "Carregador do telemóvel",
        checklist_underwear: "Roupa interior",
        checklist_toiletries: "Escova de dentes/pasta",
        checklist_medications: "Medicamentos essenciais",
        checklist_confirm_reservations: "Confirmar reservas",
        checklist_online_checkin: "Fazer check-in online",
        checklist_notify_bank: "Informar banco da viagem",
        
        // ----- Geral / App -----
        app_name: "ToTravel",
        tagline: "Planeia. Viaja. Recorda.",
        welcome_title: "Bem-vindo ao ToTravel",
        welcome_subtitle: "O teu companheiro de viagem do primeiro sonho à última memória",
        start_planning: "Começar a Planejar",
        know_app: "Já conheço a app",
        all_in_one: "Tudo num só lugar",
        organize_text: "Organiza o teu itinerário, orçamento, checklists e memórias numa única plataforma intuitiva.",
        continue: "Continuar",
        take_everywhere: "Leva contigo everywhere",
        offline_text: "Acede aos teus planos offline durante a viagem. Sem internet, sem stress!",
        explore: "Explorar ToTravel",
        offline_mode: "Modo Offline",
        loading: "A carregar...",
        saving: "A guardar...",
        
        // ----- Templates -----
        choose_template: "Escolhe um Template",
        start_predefined: "Começa com um roteiro pré-definido e personaliza",
        template_romance: "Escapadinha Romântica",
        special_dinners: "Jantares especiais",
        sunset: "Pôr-do-sol",
        template_adventure: "Aventura na Natureza",
        camping: "Acampamento",
        template_family: "Férias em Família",
        kids_activities: "Atividades kids",
        relax: "Relax",
        culture: "Cultura",
        gastronomy: "Gastronomia",
        template_beach: "Relax na Praia",
        sun: "Sol",
        sea: "Mar",
        rest: "Descanso",
        start_scratch: "Começar do Zero",
        create_own: "Cria o teu próprio roteiro",
        
        // ----- Viagem -----
        new_trip: "Nova Viagem",
        new_trip_short: "Nova Viagem",
        start_adventure: "Começa a planear a tua próxima aventura",
        trip_name: "Nome da Viagem *",
        ex_paris: "ex: Aventura em Paris",
        start_date: "Data Início *",
        end_date: "Data Fim *",
        destination: "Cidade Destino *",
        start_typing: "Começa a digitar...",
        budget: "Orçamento Estimado",
        budget_label: "Orçamento",
        cancel: "Cancelar",
        create_trip: "Criar Viagem",
        select_trip: "Seleciona uma viagem...",
        create_trip_first: "Cria uma viagem primeiro!",
        select_trip_first: "Seleciona uma viagem primeiro!",
        trip_created: "Viagem criada com sucesso!",
        
        // ----- Locais / Lugares -----
        add_to_itinerary: "Adicionar ao Roteiro",
        edit_place: "Editar Local",
        place: "Local *",
        places: "locais",
        place_name: "Nome do lugar",
        address: "Endereço",
        search_address: "Procurar endereço...",
        stay_dates: "Datas da Estadia",
        check_in: "Check-in",
        check_out: "Check-out",
        nights: "noite(s)",
        checkin_after_checkout: "Check-out deve ser depois do check-in",
        
        // ----- Transporte -----
        transport_mode: "Meio de Transporte *",
        walking: "A Pé",
        car: "Carro",
        ride_app: "App",
        flight: "Voo",
        // NOVOS MODOS
        bus: "Autocarro",
        train: "Comboio",
        
        // ----- Categorias -----
        category: "Categoria",
        hotel: "Hotel",
        restaurant: "Restaurante",
        attraction: "Atração",
        airport: "Aeroporto",
        transport: "Transporte",
        other: "Outro",
        
        // ----- Tempo -----
        day: "Dia",
        days: "dias",
        start: "Início",
        end: "Fim",
        time: "Tempo",
        duration: "Duração",
        
        // ----- Custos -----
        activity_cost: "Custo da Atividade",
        notes: "Notas",
        additional_info: "Informações adicionais...",
        add: "Adicionar",
        added: "Adicionado!",
        updated: "Atualizado!",
        removed: "Removido",
        add_place: "Adicionar Local",
        no_places: "Nenhum local planejado",
        no_places_timeline: "Adiciona locais ao teu roteiro para ver a timeline",
        confirm_delete: "Remover este local?",
        
        // ----- Memórias -----
        memory_album: "Álbum de Memórias",
        save_moments: "Guarda os melhores momentos da tua viagem",
        add_photos: "Adicionar Fotos",
        click_upload: "Clique para carregar fotos",
        or_drag: "ou arrasta para aqui",
        photos_added: "foto(s) adicionada(s)",
        no_photos: "Ainda sem fotos. Adiciona as tuas memórias!",
        
        // ----- Exportar / Partilhar -----
        share_trip: "Partilhar Viagem",
        export_share: "Exporta ou partilha o teu itinerário",
        export_pdf: "Exportar PDF",
        professional_report: "Relatório profissional da viagem",
        save_file: "Guardar Ficheiro",
        share_link: "Partilhar Link",
        send_companions: "Enviar para companheiros",
        close: "Fechar",
        saved: "Guardado!",
        link_shared: "Link partilhado!",
        link_copied: "Link copiado!",
        copy_link: "Copia este link:",
        check_itinerary: "Confere o meu itinerário para",
        trip_too_large: "Viagem muito grande para partilhar por link. Usa exportar ficheiro.",
        generating: "a gerar...",
        
        // ----- Importar -----
        load_trip: "Carregar Viagem",
        select_file: "Selecionar Ficheiro",
        or: "ou",
        paste_code: "Cole o código da viagem aqui...",
        import: "Importar",
        imported: "Importado!",
        paste_first: "Cole os dados primeiro!",
        
        // ----- Gastos -----
        register_expense: "Registar Gasto",
        register_expense_short: "Registar Gasto",
        description: "Descrição",
        ex_dinner: "ex: Jantar",
        amount: "Valor",
        expense_registered: "Gasto registado!",
        fill_desc_amount: "Preenche descrição e valor!",
        spent: "Gasto",
        remaining: "Restante",
        by_category: "Por Categoria",
        recent_expenses: "Gastos Recentes",
        
        // ----- Categorias de Gastos -----
        food: "Comida",
        shopping: "Compras",
        activities: "Atividades",
        accommodation: "Alojamento",
        other_cat: "Outro",
        
        // ----- Tabs -----
        itinerary: "Roteiro",
        itinerary_short: "Roteiro",
        timeline: "Timeline",
        time_short: "Hora",
        budget_tab: "Orçamento",
        budget_short: "Orçamento",
        stats: "Estatísticas",
        expense_short: "Gasto",
        
        // ----- Checklists -----
        checklists_notes: "Checklists & Notas",
        packing_list: "Mala de Viagem",
        to_do: "A Fazer",
        trip_notes: "Notas da Viagem",
        notes_placeholder: "Anotações importantes, ideias, lembretes...",
        new_item: "Novo item:",
        item_added: "Item adicionado!",
        
        // ----- Mapa / Estatísticas -----
        loading_map: "A carregar mapa...",
        distance: "Distância",
        segments: "Segmentos",
        total_distance: "Distância Total",
        travel_time: "Tempo de Deslocação",
        places_visited: "Locais Visitados",
        by_transport: "Por Modo de Transporte",
        trip_summary: "Resumo da Viagem",
        summary: "Resumo",
        generated_by: "Gerado por ToTravel",
        
        // ----- Validações -----
        required_field: "Campo obrigatório",
        invalid_date: "Data inválida",
        start_before_end: "Data de início deve ser anterior à data de fim!",
        
        // ----- Ações -----
        save: "Guardar",
        edit: "Editar",
        delete: "Eliminar",
        back: "Voltar",
        next: "Próximo",
        finish: "Terminar",

        // ----- NOVAS CHAVES PARA MODAL DE DETALHES -----
        place_details: "Detalhes do Local",
        error_loading_details: "Erro ao carregar detalhes"
    },

    // ============================================
    // ENGLISH (EN)
    // ============================================
    en: {
        // ----- Language Selection (First Action) -----
        select_language: "Select your language",
        choose_language: "Choose a language to start",
        language_changed: "Language changed!",
        
        // ----- Map - Views -----
        map_view: "Map View",
        terrain: "Terrain",
        satellite: "Satellite",
        search_nearby: "Search nearby...",
        search_in_city: "Search in city...",
        add_to_day: "Add to Day",
        click_map_add: "Click on the map to add",
        
        // ----- POIs -----
        restaurants: "Restaurants",
        attractions: "Attractions",
        museums: "Museums",
        public_transport: "Public Transport",
        pharmacies: "Pharmacies",
        atm: "ATM",
        hotels: "Hotels",
        
        // ----- Geolocation -----
        my_location: "My Location",
        follow_location: "Follow Position",
        stop_following: "Stop Following",
        location_active: "Location active",
        location_denied: "Location permission denied",
        
        // ----- Checklist Items -----
        checklist_documents: "Documents (ID, Passport)",
        checklist_charger: "Phone charger",
        checklist_underwear: "Underwear",
        checklist_toiletries: "Toothbrush/toothpaste",
        checklist_medications: "Essential medications",
        checklist_confirm_reservations: "Confirm reservations",
        checklist_online_checkin: "Online check-in",
        checklist_notify_bank: "Notify bank of travel",
        
        // ----- General / App -----
        app_name: "ToTravel",
        tagline: "Plan. Travel. Remember.",
        welcome_title: "Welcome to ToTravel",
        welcome_subtitle: "Your travel companion from the first dream to the last memory",
        start_planning: "Start Planning",
        know_app: "I already know the app",
        all_in_one: "All in one place",
        organize_text: "Organize your itinerary, budget, checklists and memories in one intuitive platform.",
        continue: "Continue",
        take_everywhere: "Take it everywhere",
        offline_text: "Access your plans offline during the trip. No internet, no stress!",
        explore: "Explore ToTravel",
        offline_mode: "Offline Mode",
        loading: "Loading...",
        saving: "Saving...",
        
        // ----- Templates -----
        choose_template: "Choose a Template",
        start_predefined: "Start with a predefined itinerary and customize",
        template_romance: "Romantic Getaway",
        special_dinners: "Special dinners",
        sunset: "Sunset",
        template_adventure: "Nature Adventure",
        camping: "Camping",
        template_family: "Family Vacation",
        kids_activities: "Kids activities",
        relax: "Relax",
        culture: "Culture",
        gastronomy: "Gastronomy",
        template_beach: "Beach Relax",
        sun: "Sun",
        sea: "Sea",
        rest: "Rest",
        start_scratch: "Start from Scratch",
        create_own: "Create your own itinerary",
        
        // ----- Trip -----
        new_trip: "New Trip",
        new_trip_short: "New Trip",
        start_adventure: "Start planning your next adventure",
        trip_name: "Trip Name *",
        ex_paris: "ex: Paris Adventure",
        start_date: "Start Date *",
        end_date: "End Date *",
        destination: "Destination City *",
        start_typing: "Start typing...",
        budget: "Estimated Budget",
        budget_label: "Budget",
        cancel: "Cancel",
        create_trip: "Create Trip",
        select_trip: "Select a trip...",
        create_trip_first: "Create a trip first!",
        select_trip_first: "Select a trip first!",
        trip_created: "Trip created successfully!",
        
        // ----- Places -----
        add_to_itinerary: "Add to Itinerary",
        edit_place: "Edit Place",
        place: "Place *",
        places: "places",
        place_name: "Place name",
        address: "Address",
        search_address: "Search address...",
        stay_dates: "Stay Dates",
        check_in: "Check-in",
        check_out: "Check-out",
        nights: "night(s)",
        checkin_after_checkout: "Check-out must be after check-in",
        
        // ----- Transport -----
        transport_mode: "Transport Mode *",
        walking: "Walking",
        car: "Car",
        ride_app: "Ride App",
        flight: "Flight",
        // NEW MODES
        bus: "Bus",
        train: "Train",
        
        // ----- Categories -----
        category: "Category",
        hotel: "Hotel",
        restaurant: "Restaurant",
        attraction: "Attraction",
        airport: "Airport",
        transport: "Transport",
        other: "Other",
        
        // ----- Time -----
        day: "Day",
        days: "days",
        start: "Start",
        end: "End",
        time: "Time",
        duration: "Duration",
        
        // ----- Costs -----
        activity_cost: "Activity Cost",
        notes: "Notes",
        additional_info: "Additional information...",
        add: "Add",
        added: "Added!",
        updated: "Updated!",
        removed: "Removed",
        add_place: "Add Place",
        no_places: "No places planned",
        no_places_timeline: "Add places to your itinerary to see the timeline",
        confirm_delete: "Remove this place?",
        
        // ----- Memories -----
        memory_album: "Memory Album",
        save_moments: "Save the best moments of your trip",
        add_photos: "Add Photos",
        click_upload: "Click to upload photos",
        or_drag: "or drag here",
        photos_added: "photo(s) added",
        no_photos: "No photos yet. Add your memories!",
        
        // ----- Export / Share -----
        share_trip: "Share Trip",
        export_share: "Export or share your itinerary",
        export_pdf: "Export PDF",
        professional_report: "Professional trip report",
        save_file: "Save File",
        share_link: "Share Link",
        send_companions: "Send to companions",
        close: "Close",
        saved: "Saved!",
        link_shared: "Link shared!",
        link_copied: "Link copied!",
        copy_link: "Copy this link:",
        check_itinerary: "Check out my itinerary for",
        trip_too_large: "Trip too large to share by link. Use export file.",
        generating: "generating...",
        
        // ----- Import -----
        load_trip: "Load Trip",
        select_file: "Select File",
        or: "or",
        paste_code: "Paste trip code here...",
        import: "Import",
        imported: "Imported!",
        paste_first: "Paste data first!",
        
        // ----- Expenses -----
        register_expense: "Register Expense",
        register_expense_short: "Register Expense",
        description: "Description",
        ex_dinner: "ex: Dinner",
        amount: "Amount",
        expense_registered: "Expense registered!",
        fill_desc_amount: "Fill description and amount!",
        spent: "Spent",
        remaining: "Remaining",
        by_category: "By Category",
        recent_expenses: "Recent Expenses",
        
        // ----- Expense Categories -----
        food: "Food",
        shopping: "Shopping",
        activities: "Activities",
        accommodation: "Accommodation",
        other_cat: "Other",
        
        // ----- Tabs -----
        itinerary: "Itinerary",
        itinerary_short: "Itinerary",
        timeline: "Timeline",
        time_short: "Time",
        budget_tab: "Budget",
        budget_short: "Budget",
        stats: "Statistics",
        expense_short: "Expense",
        
        // ----- Checklists -----
        checklists_notes: "Checklists & Notes",
        packing_list: "Packing List",
        to_do: "To Do",
        trip_notes: "Trip Notes",
        notes_placeholder: "Important notes, ideas, reminders...",
        new_item: "New item:",
        item_added: "Item added!",
        
        // ----- Map / Statistics -----
        loading_map: "Loading map...",
        distance: "Distance",
        segments: "Segments",
        total_distance: "Total Distance",
        travel_time: "Travel Time",
        places_visited: "Places Visited",
        by_transport: "By Transport Mode",
        trip_summary: "Trip Summary",
        summary: "Summary",
        generated_by: "Generated by ToTravel",
        
        // ----- Validations -----
        required_field: "Required field",
        invalid_date: "Invalid date",
        start_before_end: "Start date must be before end date!",
        
        // ----- Actions -----
        save: "Save",
        edit: "Edit",
        delete: "Delete",
        back: "Back",
        next: "Next",
        finish: "Finish",

        // ----- NEW KEYS FOR DETAILS MODAL -----
        place_details: "Place Details",
        error_loading_details: "Error loading details"
    },

    // ============================================
    // ESPAÑOL (ES)
    // ============================================
    es: {
        // ----- Selección de Idioma (Primera Acción) -----
        select_language: "Selecciona tu idioma",
        choose_language: "Elige un idioma para comenzar",
        language_changed: "¡Idioma cambiado!",
        
        // ----- Mapa - Vistas -----
        map_view: "Vista del Mapa",
        terrain: "Terreno",
        satellite: "Satélite",
        search_nearby: "Buscar cerca...",
        search_in_city: "Buscar en la ciudad...",
        add_to_day: "Añadir al Día",
        click_map_add: "Haz clic en el mapa para añadir",
        
        // ----- POIs -----
        restaurants: "Restaurantes",
        attractions: "Atracciones",
        museums: "Museos",
        public_transport: "Transporte Público",
        pharmacies: "Farmacias",
        atm: "Cajero",
        hotels: "Hoteles",
        
        // ----- Geolocalización -----
        my_location: "Mi Ubicación",
        follow_location: "Seguir Posición",
        stop_following: "Dejar de Seguir",
        location_active: "Ubicación activa",
        location_denied: "Permiso de ubicación denegado",
        
        // ----- Checklist Items -----
        checklist_documents: "Documentos (DNI, Pasaporte)",
        checklist_charger: "Cargador del móvil",
        checklist_underwear: "Ropa interior",
        checklist_toiletries: "Cepillo de dientes/pasta",
        checklist_medications: "Medicamentos esenciales",
        checklist_confirm_reservations: "Confirmar reservas",
        checklist_online_checkin: "Hacer check-in online",
        checklist_notify_bank: "Informar al banco del viaje",
        
        // ----- General / App -----
        app_name: "ToTravel",
        tagline: "Planifica. Viaja. Recuerda.",
        welcome_title: "Bienvenido a ToTravel",
        welcome_subtitle: "Tu compañero de viaje desde el primer sueño hasta el último recuerdo",
        start_planning: "Comenzar a Planificar",
        know_app: "Ya conozco la app",
        all_in_one: "Todo en un solo lugar",
        organize_text: "Organiza tu itinerario, presupuesto, listas y memorias en una plataforma intuitiva.",
        continue: "Continuar",
        take_everywhere: "Llévalo a todas partes",
        offline_text: "Accede a tus planes offline durante el viaje. ¡Sin internet, sin estrés!",
        explore: "Explorar ToTravel",
        offline_mode: "Modo Offline",
        loading: "Cargando...",
        saving: "Guardando...",
        
        // ----- Templates -----
        choose_template: "Elige una Plantilla",
        start_predefined: "Comienza con un itinerario predefinido y personaliza",
        template_romance: "Escapada Romántica",
        special_dinners: "Cenas especiales",
        sunset: "Atardecer",
        template_adventure: "Aventura en la Naturaleza",
        camping: "Camping",
        template_family: "Vacaciones en Familia",
        kids_activities: "Actividades niños",
        relax: "Relax",
        culture: "Cultura",
        gastronomy: "Gastronomía",
        template_beach: "Relax en la Playa",
        sun: "Sol",
        sea: "Mar",
        rest: "Descanso",
        start_scratch: "Empezar desde Cero",
        create_own: "Crea tu propio itinerario",
        
        // ----- Trip -----
        new_trip: "Nuevo Viaje",
        new_trip_short: "Nuevo Viaje",
        start_adventure: "Comienza a planificar tu próxima aventura",
        trip_name: "Nombre del Viaje *",
        ex_paris: "ej: Aventura en París",
        start_date: "Fecha Inicio *",
        end_date: "Fecha Fin *",
        destination: "Ciudad Destino *",
        start_typing: "Empieza a escribir...",
        budget: "Presupuesto Estimado",
        budget_label: "Presupuesto",
        cancel: "Cancelar",
        create_trip: "Crear Viaje",
        select_trip: "Selecciona un viaje...",
        create_trip_first: "¡Crea un viaje primero!",
        select_trip_first: "¡Selecciona un viaje primero!",
        trip_created: "¡Viaje creado con éxito!",
        
        // ----- Places -----
        add_to_itinerary: "Añadir al Itinerario",
        edit_place: "Editar Lugar",
        place: "Lugar *",
        places: "lugares",
        place_name: "Nombre del lugar",
        address: "Dirección",
        search_address: "Buscar dirección...",
        stay_dates: "Fechas de Estancia",
        check_in: "Check-in",
        check_out: "Check-out",
        nights: "noche(s)",
        checkin_after_checkout: "El check-out debe ser después del check-in",
        
        // ----- Transport -----
        transport_mode: "Medio de Transporte *",
        walking: "A Pie",
        car: "Coche",
        ride_app: "App",
        flight: "Vuelo",
        // NUEVOS MODOS
        bus: "Autobús",
        train: "Tren",
        
        // ----- Categories -----
        category: "Categoría",
        hotel: "Hotel",
        restaurant: "Restaurante",
        attraction: "Atracción",
        airport: "Aeropuerto",
        transport: "Transporte",
        other: "Otro",
        
        // ----- Time -----
        day: "Día",
        days: "días",
        start: "Inicio",
        end: "Fin",
        time: "Tiempo",
        duration: "Duración",
        
        // ----- Costs -----
        activity_cost: "Coste de la Actividad",
        notes: "Notas",
        additional_info: "Información adicional...",
        add: "Añadir",
        added: "¡Añadido!",
        updated: "¡Actualizado!",
        removed: "Eliminado",
        add_place: "Añadir Lugar",
        no_places: "Sin lugares planificados",
        no_places_timeline: "Añade lugares a tu itinerario para ver la timeline",
        confirm_delete: "¿Eliminar este lugar?",
        
        // ----- Memories -----
        memory_album: "Álbum de Recuerdos",
        save_moments: "Guarda los mejores momentos de tu viaje",
        add_photos: "Añadir Fotos",
        click_upload: "Click para subir fotos",
        or_drag: "o arrastra aquí",
        photos_added: "foto(s) añadida(s)",
        no_photos: "Aún sin fotos. ¡Añade tus recuerdos!",
        
        // ----- Export / Share -----
        share_trip: "Compartir Viaje",
        export_share: "Exporta o comparte tu itinerario",
        export_pdf: "Exportar PDF",
        professional_report: "Informe profesional del viaje",
        save_file: "Guardar Archivo",
        share_link: "Compartir Enlace",
        send_companions: "Enviar a compañeros",
        close: "Cerrar",
        saved: "¡Guardado!",
        link_shared: "¡Enlace compartido!",
        link_copied: "¡Enlace copiado!",
        copy_link: "Copia este enlace:",
        check_itinerary: "Mira mi itinerario para",
        trip_too_large: "Viaje demasiado grande para compartir por enlace. Usa exportar archivo.",
        generating: "generando...",
        
        // ----- Import -----
        load_trip: "Cargar Viaje",
        select_file: "Seleccionar Archivo",
        or: "o",
        paste_code: "Pega el código del viaje aquí...",
        import: "Importar",
        imported: "¡Importado!",
        paste_first: "¡Pega los datos primero!",
        
        // ----- Expenses -----
        register_expense: "Registrar Gasto",
        register_expense_short: "Registrar Gasto",
        description: "Descripción",
        ex_dinner: "ej: Cena",
        amount: "Importe",
        expense_registered: "¡Gasto registrado!",
        fill_desc_amount: "¡Rellena descripción e importe!",
        spent: "Gastado",
        remaining: "Restante",
        by_category: "Por Categoría",
        recent_expenses: "Gastos Recientes",
        
        // ----- Expense Categories -----
        food: "Comida",
        shopping: "Compras",
        activities: "Actividades",
        accommodation: "Alojamiento",
        other_cat: "Otro",
        
        // ----- Tabs -----
        itinerary: "Itinerario",
        itinerary_short: "Itinerario",
        timeline: "Timeline",
        time_short: "Hora",
        budget_tab: "Presupuesto",
        budget_short: "Presupuesto",
        stats: "Estadísticas",
        expense_short: "Gasto",
        
        // ----- Checklists -----
        checklists_notes: "Listas & Notas",
        packing_list: "Maleta de Viaje",
        to_do: "Por Hacer",
        trip_notes: "Notas del Viaje",
        notes_placeholder: "Notas importantes, ideas, recordatorios...",
        new_item: "Nuevo item:",
        item_added: "¡Item añadido!",
        
        // ----- Map / Statistics -----
        loading_map: "Cargando mapa...",
        distance: "Distancia",
        segments: "Segmentos",
        total_distance: "Distancia Total",
        travel_time: "Tiempo de Desplazamiento",
        places_visited: "Lugares Visitados",
        by_transport: "Por Modo de Transporte",
        trip_summary: "Resumen del Viaje",
        summary: "Resumen",
        generated_by: "Generado por ToTravel",
        
        // ----- Validations -----
        required_field: "Campo obligatorio",
        invalid_date: "Fecha inválida",
        start_before_end: "¡La fecha de inicio debe ser anterior a la fecha de fin!",
        
        // ----- Actions -----
        save: "Guardar",
        edit: "Editar",
        delete: "Eliminar",
        back: "Volver",
        next: "Siguiente",
        finish: "Terminar",

        // ----- NUEVAS CLAVES PARA MODAL DE DETALLES -----
        place_details: "Detalles del Lugar",
        error_loading_details: "Error al cargar detalles"
    }
};

/**
 * Configurações de idioma
 */
const LANGUAGE_CONFIG = {
    default: 'pt',
    available: ['pt', 'en', 'es'],
    flags: {
        pt: '🇵🇹',
        en: '🇬🇧',
        es: '🇪🇸'
    },
    codes: {
        pt: 'PT',
        en: 'EN',
        es: 'ES'
    },
    names: {
        pt: 'Português',
        en: 'English',
        es: 'Español'
    },
    locales: {
        pt: 'pt-PT',
        en: 'en-GB',
        es: 'es-ES'
    }
};

/**
 * Verifica se o idioma já foi selecionado
 * @returns {boolean}
 */
function hasLanguageBeenSelected() {
    return localStorage.getItem('totravel_language_selected') === 'true';
}

/**
 * Marca o idioma como selecionado
 */
function markLanguageAsSelected() {
    localStorage.setItem('totravel_language_selected', 'true');
}

/**
 * Obtém o idioma atual do localStorage ou detecta do navegador
 * @returns {string} Código do idioma (pt, en, es)
 */
function getCurrentLanguage() {
    const stored = localStorage.getItem('totravel_language');
    if (stored && LANGUAGE_CONFIG.available.includes(stored)) {
        return stored;
    }
    
    // Detecção automática do navegador
    const browserLang = navigator.language?.substring(0, 2);
    if (browserLang && LANGUAGE_CONFIG.available.includes(browserLang)) {
        return browserLang;
    }
    
    return LANGUAGE_CONFIG.default;
}

/**
 * Variável global do idioma atual
 */
let currentLanguage = getCurrentLanguage();

/**
 * Função de tradução principal
 * @param {string} key - Chave da tradução
 * @param {string} lang - Idioma opcional (usa o atual se não especificado)
 * @returns {string} Texto traduzido ou a chave se não encontrada
 */
function t(key, lang = null) {
    const targetLang = lang || currentLanguage;
    const translations = TRANSLATIONS[targetLang];
    
    if (translations && translations[key]) {
        return translations[key];
    }
    
    // Fallback para português
    if (targetLang !== 'pt' && TRANSLATIONS.pt[key]) {
        return TRANSLATIONS.pt[key];
    }
    
    return key;
}

/**
 * Atualiza o idioma atual e salva no localStorage
 * @param {string} lang - Código do idioma (pt, en, es)
 */
function changeLanguage(lang) {
    if (!LANGUAGE_CONFIG.available.includes(lang)) {
        console.warn(`Idioma não suportado: ${lang}`);
        return;
    }
    
    currentLanguage = lang;
    localStorage.setItem('totravel_language', lang);
    markLanguageAsSelected();
    
    // Atualizar UI do seletor
    updateLanguageUI();
    
    // Atualizar todas as traduções na página com fade suave
    updateTranslations();
    
    // Atualizar classes ativas no dropdown
    document.querySelectorAll('.language-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === lang);
    });
    
    // Fechar dropdown
    const dropdown = document.getElementById('languageDropdown');
    if (dropdown) dropdown.classList.remove('show');
    
    // Mostrar toast de confirmação
    showToast(t('language_changed'));
}

/**
 * Atualiza a interface do seletor de idioma
 */
function updateLanguageUI() {
    const flagEl = document.getElementById('currentLangFlag');
    const codeEl = document.getElementById('currentLangCode');
    
    if (flagEl) flagEl.textContent = LANGUAGE_CONFIG.flags[currentLanguage];
    if (codeEl) codeEl.textContent = LANGUAGE_CONFIG.codes[currentLanguage];
}

/**
 * Atualiza todas as traduções na página com efeito de fade suave
 */
function updateTranslations() {
    const texts = TRANSLATIONS[currentLanguage];
    
    // Aplicar fade out
    document.body.classList.add('lang-transition');
    
    setTimeout(() => {
        // Atualizar elementos com data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (texts[key]) {
                el.textContent = texts[key];
            }
        });
        
        // Atualizar placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (texts[key]) {
                el.placeholder = texts[key];
            }
        });
        
        // Atualizar atributos title
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.dataset.i18nTitle;
            if (texts[key]) {
                el.title = texts[key];
            }
        });
        
        // Atualizar checklists (se a função existir)
        if (typeof window.updateChecklistTranslations === 'function') {
            window.updateChecklistTranslations();
        }
        if (typeof window.loadChecklists === 'function') {
            window.loadChecklists();
        }
        
        // Remover fade
        document.body.classList.remove('lang-transition');
    }, 150);
}

/**
 * Alterna a visibilidade do dropdown de idiomas
 */
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    if (dropdown) dropdown.classList.toggle('show');
}

/**
 * Mostra o seletor de idioma como primeira ação
 */
function showLanguageSelector() {
    const modal = document.getElementById('languageSelectorModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.remove('hidden');
    }
}

/**
 * Esconde o seletor de idioma e continua para a app
 */
function hideLanguageSelector() {
    const modal = document.getElementById('languageSelectorModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.add('hidden');
    }
}

// ============================================================================
// FUNÇÃO initializeApp ADICIONADA PARA RESOLVER O ERRO "initializeApp is not defined"
// ============================================================================

/**
 * Inicializa a aplicação principal
 * (Movida do index.html para garantir disponibilidade antes da chamada em selectInitialLanguage)
 */
function initializeApp() {
    // Carregar viagens do localStorage
    if (typeof loadTripsFromStorage === 'function') {
        loadTripsFromStorage();
    }
    
    if (typeof updateTripSelector === 'function') {
        updateTripSelector();
    }
    
    // Inicializar sistema de tradução
    initI18n();
    
    // Mostrar app
    const app = document.getElementById('app');
    if (app) {
        app.classList.remove('hidden');
    }
    
    // Verificar se há viagens
    if (typeof trips !== 'undefined' && trips.length > 0) {
        if (typeof switchTrip === 'function') {
            switchTrip(trips[0].id);
        }
    } else {
        if (typeof showWelcomeState === 'function') {
            showWelcomeState();
        }
    }
    
    // Setup de detecção offline
    if (typeof setupOfflineDetection === 'function') {
        setupOfflineDetection();
    }
    
    // Setup de handlers de modais
    if (typeof setupModalHandlers === 'function') {
        setupModalHandlers();
    }
    
    // Inicializar autocomplete após delay
    setTimeout(function() {
        if (typeof initNewTripAutocomplete === 'function') {
            initNewTripAutocomplete();
        }
    }, 1500);
}

// Garantir disponibilidade global
window.initializeApp = initializeApp;

// ============================================================================
// FIM DA FUNÇÃO ADICIONADA
// ============================================================================

/**
 * Seleciona o idioma inicial e continua
 * @param {string} lang - Código do idioma
 */
function selectInitialLanguage(lang) {
    changeLanguage(lang);
    hideLanguageSelector();
    
    // Agora initializeApp já está definida
    initializeApp();
}

/**
 * Inicializa o sistema de tradução
 */
function initI18n() {
    updateLanguageUI();
    updateTranslations();
    
    // Fechar dropdown ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.language-selector')) {
            const dropdown = document.getElementById('languageDropdown');
            if (dropdown) dropdown.classList.remove('show');
        }
    });
}

// Exportar para uso global
window.TRANSLATIONS = TRANSLATIONS;
window.LANGUAGE_CONFIG = LANGUAGE_CONFIG;
window.t = t;
window.changeLanguage = changeLanguage;
window.updateLanguageUI = updateLanguageUI;
window.updateTranslations = updateTranslations;
window.toggleLanguageDropdown = toggleLanguageDropdown;
window.initI18n = initI18n;
window.getCurrentLanguage = getCurrentLanguage;
window.hasLanguageBeenSelected = hasLanguageBeenSelected;
window.markLanguageAsSelected = markLanguageAsSelected;
window.showLanguageSelector = showLanguageSelector;
window.hideLanguageSelector = hideLanguageSelector;
window.selectInitialLanguage = selectInitialLanguage;

// Função showToast (será definida no index.html, mas declarada aqui para referência)
window.showToast = window.showToast || function(message, type = 'success') {
    console.log(`[${type}] ${message}`);
};/**
 * ============================================
 * TOTRAVEL - SISTEMA DE TRADUÇÃO i18n
 * ============================================
 * Suporte: Português (PT), English (EN), Español (ES)
 * 
 * Estrutura organizada por categorias funcionais
 */

const TRANSLATIONS = {
    // ============================================
    // PORTUGUÊS (PT) - Idioma padrão
    // ============================================
    pt: {
        // ----- Seleção de Idioma (Primeira Ação) -----
        select_language: "Seleciona o teu idioma",
        choose_language: "Escolhe o idioma para começar",
        language_changed: "Idioma alterado!",
        
        // ----- Mapa - Visões -----
        map_view: "Visão do Mapa",
        terrain: "Terreno",
        satellite: "Satélite",
        search_nearby: "Procurar perto...",
        search_in_city: "Procurar na cidade...",
        add_to_day: "Adicionar ao Dia",
        click_map_add: "Clica no mapa para adicionar",
        
        // ----- POIs -----
        restaurants: "Restaurantes",
        attractions: "Atrações",
        museums: "Museus",
        public_transport: "Transportes",
        pharmacies: "Farmácias",
        atm: "Multibanco",
        hotels: "Hotéis", // NOVO
        
        // ----- Geolocalização -----
        my_location: "A Minha Localização",
        follow_location: "Seguir Posição",
        stop_following: "Parar de Seguir",
        location_active: "Localização ativa",
        location_denied: "Permissão de localização negada",
        
        // ----- Checklist Items -----
        checklist_documents: "Documentos (CC, Passaporte)",
        checklist_charger: "Carregador do telemóvel",
        checklist_underwear: "Roupa interior",
        checklist_toiletries: "Escova de dentes/pasta",
        checklist_medications: "Medicamentos essenciais",
        checklist_confirm_reservations: "Confirmar reservas",
        checklist_online_checkin: "Fazer check-in online",
        checklist_notify_bank: "Informar banco da viagem",
        
        // ----- Geral / App -----
        app_name: "ToTravel",
        tagline: "Planeia. Viaja. Recorda.",
        welcome_title: "Bem-vindo ao ToTravel",
        welcome_subtitle: "O teu companheiro de viagem do primeiro sonho à última memória",
        start_planning: "Começar a Planejar",
        know_app: "Já conheço a app",
        all_in_one: "Tudo num só lugar",
        organize_text: "Organiza o teu itinerário, orçamento, checklists e memórias numa única plataforma intuitiva.",
        continue: "Continuar",
        take_everywhere: "Leva contigo everywhere",
        offline_text: "Acede aos teus planos offline durante a viagem. Sem internet, sem stress!",
        explore: "Explorar ToTravel",
        offline_mode: "Modo Offline",
        loading: "A carregar...",
        saving: "A guardar...",
        
        // ----- Templates -----
        choose_template: "Escolhe um Template",
        start_predefined: "Começa com um roteiro pré-definido e personaliza",
        template_romance: "Escapadinha Romântica",
        special_dinners: "Jantares especiais",
        sunset: "Pôr-do-sol",
        template_adventure: "Aventura na Natureza",
        camping: "Acampamento",
        template_family: "Férias em Família",
        kids_activities: "Atividades kids",
        relax: "Relax",
        culture: "Cultura",
        gastronomy: "Gastronomia",
        template_beach: "Relax na Praia",
        sun: "Sol",
        sea: "Mar",
        rest: "Descanso",
        start_scratch: "Começar do Zero",
        create_own: "Cria o teu próprio roteiro",
        
        // ----- Viagem -----
        new_trip: "Nova Viagem",
        new_trip_short: "Nova Viagem",
        start_adventure: "Começa a planear a tua próxima aventura",
        trip_name: "Nome da Viagem *",
        ex_paris: "ex: Aventura em Paris",
        start_date: "Data Início *",
        end_date: "Data Fim *",
        destination: "Cidade Destino *",
        start_typing: "Começa a digitar...",
        budget: "Orçamento Estimado",
        budget_label: "Orçamento",
        cancel: "Cancelar",
        create_trip: "Criar Viagem",
        select_trip: "Seleciona uma viagem...",
        create_trip_first: "Cria uma viagem primeiro!",
        select_trip_first: "Seleciona uma viagem primeiro!",
        trip_created: "Viagem criada com sucesso!",
        
        // ----- Locais / Lugares -----
        add_to_itinerary: "Adicionar ao Roteiro",
        edit_place: "Editar Local",
        place: "Local *",
        places: "locais",
        place_name: "Nome do lugar",
        address: "Endereço",
        search_address: "Procurar endereço...",
        stay_dates: "Datas da Estadia",
        check_in: "Check-in",
        check_out: "Check-out",
        nights: "noite(s)",
        checkin_after_checkout: "Check-out deve ser depois do check-in",
        
        // ----- Transporte -----
        transport_mode: "Meio de Transporte *",
        walking: "A Pé",
        car: "Carro",
        ride_app: "App",
        flight: "Voo",
        
        // ----- Categorias -----
        category: "Categoria",
        hotel: "Hotel",
        restaurant: "Restaurante",
        attraction: "Atração",
        airport: "Aeroporto",
        transport: "Transporte",
        other: "Outro",
        
        // ----- Tempo -----
        day: "Dia",
        days: "dias",
        start: "Início",
        end: "Fim",
        time: "Tempo",
        duration: "Duração",
        
        // ----- Custos -----
        activity_cost: "Custo da Atividade",
        notes: "Notas",
        additional_info: "Informações adicionais...",
        add: "Adicionar",
        added: "Adicionado!",
        updated: "Atualizado!",
        removed: "Removido",
        add_place: "Adicionar Local",
        no_places: "Nenhum local planejado",
        no_places_timeline: "Adiciona locais ao teu roteiro para ver a timeline",
        confirm_delete: "Remover este local?",
        
        // ----- Memórias -----
        memory_album: "Álbum de Memórias",
        save_moments: "Guarda os melhores momentos da tua viagem",
        add_photos: "Adicionar Fotos",
        click_upload: "Clique para carregar fotos",
        or_drag: "ou arrasta para aqui",
        photos_added: "foto(s) adicionada(s)",
        no_photos: "Ainda sem fotos. Adiciona as tuas memórias!",
        
        // ----- Exportar / Partilhar -----
        share_trip: "Partilhar Viagem",
        export_share: "Exporta ou partilha o teu itinerário",
        export_pdf: "Exportar PDF",
        professional_report: "Relatório profissional da viagem",
        save_file: "Guardar Ficheiro",
        share_link: "Partilhar Link",
        send_companions: "Enviar para companheiros",
        close: "Fechar",
        saved: "Guardado!",
        link_shared: "Link partilhado!",
        link_copied: "Link copiado!",
        copy_link: "Copia este link:",
        check_itinerary: "Confere o meu itinerário para",
        trip_too_large: "Viagem muito grande para partilhar por link. Usa exportar ficheiro.",
        generating: "a gerar...",
        
        // ----- Importar -----
        load_trip: "Carregar Viagem",
        select_file: "Selecionar Ficheiro",
        or: "ou",
        paste_code: "Cole o código da viagem aqui...",
        import: "Importar",
        imported: "Importado!",
        paste_first: "Cole os dados primeiro!",
        
        // ----- Gastos -----
        register_expense: "Registar Gasto",
        register_expense_short: "Registar Gasto",
        description: "Descrição",
        ex_dinner: "ex: Jantar",
        amount: "Valor",
        expense_registered: "Gasto registado!",
        fill_desc_amount: "Preenche descrição e valor!",
        spent: "Gasto",
        remaining: "Restante",
        by_category: "Por Categoria",
        recent_expenses: "Gastos Recentes",
        
        // ----- Categorias de Gastos -----
        food: "Comida",
        shopping: "Compras",
        activities: "Atividades",
        accommodation: "Alojamento",
        other_cat: "Outro",
        
        // ----- Tabs -----
        itinerary: "Roteiro",
        itinerary_short: "Roteiro",
        timeline: "Timeline",
        time_short: "Hora",
        budget_tab: "Orçamento",
        budget_short: "Orçamento",
        stats: "Estatísticas",
        expense_short: "Gasto",
        
        // ----- Checklists -----
        checklists_notes: "Checklists & Notas",
        packing_list: "Mala de Viagem",
        to_do: "A Fazer",
        trip_notes: "Notas da Viagem",
        notes_placeholder: "Anotações importantes, ideias, lembretes...",
        new_item: "Novo item:",
        item_added: "Item adicionado!",
        
        // ----- Mapa / Estatísticas -----
        loading_map: "A carregar mapa...",
        distance: "Distância",
        segments: "Segmentos",
        total_distance: "Distância Total",
        travel_time: "Tempo de Deslocação",
        places_visited: "Locais Visitados",
        by_transport: "Por Modo de Transporte",
        trip_summary: "Resumo da Viagem",
        summary: "Resumo",
        generated_by: "Gerado por ToTravel",
        
        // ----- Validações -----
        required_field: "Campo obrigatório",
        invalid_date: "Data inválida",
        start_before_end: "Data de início deve ser anterior à data de fim!",
        
        // ----- Ações -----
        save: "Guardar",
        edit: "Editar",
        delete: "Eliminar",
        back: "Voltar",
        next: "Próximo",
        finish: "Terminar",

        // ----- NOVAS CHAVES PARA MODAL DE DETALHES -----
        place_details: "Detalhes do Local",
        error_loading_details: "Erro ao carregar detalhes"
    },

    // ============================================
    // ENGLISH (EN)
    // ============================================
    en: {
        // ----- Language Selection (First Action) -----
        select_language: "Select your language",
        choose_language: "Choose a language to start",
        language_changed: "Language changed!",
        
        // ----- Map - Views -----
        map_view: "Map View",
        terrain: "Terrain",
        satellite: "Satellite",
        search_nearby: "Search nearby...",
        search_in_city: "Search in city...",
        add_to_day: "Add to Day",
        click_map_add: "Click on the map to add",
        
        // ----- POIs -----
        restaurants: "Restaurants",
        attractions: "Attractions",
        museums: "Museums",
        public_transport: "Public Transport",
        pharmacies: "Pharmacies",
        atm: "ATM",
        hotels: "Hotels", // NEW
        
        // ----- Geolocation -----
        my_location: "My Location",
        follow_location: "Follow Position",
        stop_following: "Stop Following",
        location_active: "Location active",
        location_denied: "Location permission denied",
        
        // ----- Checklist Items -----
        checklist_documents: "Documents (ID, Passport)",
        checklist_charger: "Phone charger",
        checklist_underwear: "Underwear",
        checklist_toiletries: "Toothbrush/toothpaste",
        checklist_medications: "Essential medications",
        checklist_confirm_reservations: "Confirm reservations",
        checklist_online_checkin: "Online check-in",
        checklist_notify_bank: "Notify bank of travel",
        
        // ----- General / App -----
        app_name: "ToTravel",
        tagline: "Plan. Travel. Remember.",
        welcome_title: "Welcome to ToTravel",
        welcome_subtitle: "Your travel companion from the first dream to the last memory",
        start_planning: "Start Planning",
        know_app: "I already know the app",
        all_in_one: "All in one place",
        organize_text: "Organize your itinerary, budget, checklists and memories in one intuitive platform.",
        continue: "Continue",
        take_everywhere: "Take it everywhere",
        offline_text: "Access your plans offline during the trip. No internet, no stress!",
        explore: "Explore ToTravel",
        offline_mode: "Offline Mode",
        loading: "Loading...",
        saving: "Saving...",
        
        // ----- Templates -----
        choose_template: "Choose a Template",
        start_predefined: "Start with a predefined itinerary and customize",
        template_romance: "Romantic Getaway",
        special_dinners: "Special dinners",
        sunset: "Sunset",
        template_adventure: "Nature Adventure",
        camping: "Camping",
        template_family: "Family Vacation",
        kids_activities: "Kids activities",
        relax: "Relax",
        culture: "Culture",
        gastronomy: "Gastronomy",
        template_beach: "Beach Relax",
        sun: "Sun",
        sea: "Sea",
        rest: "Rest",
        start_scratch: "Start from Scratch",
        create_own: "Create your own itinerary",
        
        // ----- Trip -----
        new_trip: "New Trip",
        new_trip_short: "New Trip",
        start_adventure: "Start planning your next adventure",
        trip_name: "Trip Name *",
        ex_paris: "ex: Paris Adventure",
        start_date: "Start Date *",
        end_date: "End Date *",
        destination: "Destination City *",
        start_typing: "Start typing...",
        budget: "Estimated Budget",
        budget_label: "Budget",
        cancel: "Cancel",
        create_trip: "Create Trip",
        select_trip: "Select a trip...",
        create_trip_first: "Create a trip first!",
        select_trip_first: "Select a trip first!",
        trip_created: "Trip created successfully!",
        
        // ----- Places -----
        add_to_itinerary: "Add to Itinerary",
        edit_place: "Edit Place",
        place: "Place *",
        places: "places",
        place_name: "Place name",
        address: "Address",
        search_address: "Search address...",
        stay_dates: "Stay Dates",
        check_in: "Check-in",
        check_out: "Check-out",
        nights: "night(s)",
        checkin_after_checkout: "Check-out must be after check-in",
        
        // ----- Transport -----
        transport_mode: "Transport Mode *",
        walking: "Walking",
        car: "Car",
        ride_app: "Ride App",
        flight: "Flight",
        
        // ----- Categories -----
        category: "Category",
        hotel: "Hotel",
        restaurant: "Restaurant",
        attraction: "Attraction",
        airport: "Airport",
        transport: "Transport",
        other: "Other",
        
        // ----- Time -----
        day: "Day",
        days: "days",
        start: "Start",
        end: "End",
        time: "Time",
        duration: "Duration",
        
        // ----- Costs -----
        activity_cost: "Activity Cost",
        notes: "Notes",
        additional_info: "Additional information...",
        add: "Add",
        added: "Added!",
        updated: "Updated!",
        removed: "Removed",
        add_place: "Add Place",
        no_places: "No places planned",
        no_places_timeline: "Add places to your itinerary to see the timeline",
        confirm_delete: "Remove this place?",
        
        // ----- Memories -----
        memory_album: "Memory Album",
        save_moments: "Save the best moments of your trip",
        add_photos: "Add Photos",
        click_upload: "Click to upload photos",
        or_drag: "or drag here",
        photos_added: "photo(s) added",
        no_photos: "No photos yet. Add your memories!",
        
        // ----- Export / Share -----
        share_trip: "Share Trip",
        export_share: "Export or share your itinerary",
        export_pdf: "Export PDF",
        professional_report: "Professional trip report",
        save_file: "Save File",
        share_link: "Share Link",
        send_companions: "Send to companions",
        close: "Close",
        saved: "Saved!",
        link_shared: "Link shared!",
        link_copied: "Link copied!",
        copy_link: "Copy this link:",
        check_itinerary: "Check out my itinerary for",
        trip_too_large: "Trip too large to share by link. Use export file.",
        generating: "generating...",
        
        // ----- Import -----
        load_trip: "Load Trip",
        select_file: "Select File",
        or: "or",
        paste_code: "Paste trip code here...",
        import: "Import",
        imported: "Imported!",
        paste_first: "Paste data first!",
        
        // ----- Expenses -----
        register_expense: "Register Expense",
        register_expense_short: "Register Expense",
        description: "Description",
        ex_dinner: "ex: Dinner",
        amount: "Amount",
        expense_registered: "Expense registered!",
        fill_desc_amount: "Fill description and amount!",
        spent: "Spent",
        remaining: "Remaining",
        by_category: "By Category",
        recent_expenses: "Recent Expenses",
        
        // ----- Expense Categories -----
        food: "Food",
        shopping: "Shopping",
        activities: "Activities",
        accommodation: "Accommodation",
        other_cat: "Other",
        
        // ----- Tabs -----
        itinerary: "Itinerary",
        itinerary_short: "Itinerary",
        timeline: "Timeline",
        time_short: "Time",
        budget_tab: "Budget",
        budget_short: "Budget",
        stats: "Statistics",
        expense_short: "Expense",
        
        // ----- Checklists -----
        checklists_notes: "Checklists & Notes",
        packing_list: "Packing List",
        to_do: "To Do",
        trip_notes: "Trip Notes",
        notes_placeholder: "Important notes, ideas, reminders...",
        new_item: "New item:",
        item_added: "Item added!",
        
        // ----- Map / Statistics -----
        loading_map: "Loading map...",
        distance: "Distance",
        segments: "Segments",
        total_distance: "Total Distance",
        travel_time: "Travel Time",
        places_visited: "Places Visited",
        by_transport: "By Transport Mode",
        trip_summary: "Trip Summary",
        summary: "Summary",
        generated_by: "Generated by ToTravel",
        
        // ----- Validations -----
        required_field: "Required field",
        invalid_date: "Invalid date",
        start_before_end: "Start date must be before end date!",
        
        // ----- Actions -----
        save: "Save",
        edit: "Edit",
        delete: "Delete",
        back: "Back",
        next: "Next",
        finish: "Finish",

        // ----- NEW KEYS FOR DETAILS MODAL -----
        place_details: "Place Details",
        error_loading_details: "Error loading details"
    },

    // ============================================
    // ESPAÑOL (ES)
    // ============================================
    es: {
        // ----- Selección de Idioma (Primera Acción) -----
        select_language: "Selecciona tu idioma",
        choose_language: "Elige un idioma para comenzar",
        language_changed: "¡Idioma cambiado!",
        
        // ----- Mapa - Vistas -----
        map_view: "Vista del Mapa",
        terrain: "Terreno",
        satellite: "Satélite",
        search_nearby: "Buscar cerca...",
        search_in_city: "Buscar en la ciudad...",
        add_to_day: "Añadir al Día",
        click_map_add: "Haz clic en el mapa para añadir",
        
        // ----- POIs -----
        restaurants: "Restaurantes",
        attractions: "Atracciones",
        museums: "Museos",
        public_transport: "Transporte Público",
        pharmacies: "Farmacias",
        atm: "Cajero",
        hotels: "Hoteles", // NUEVO
        
        // ----- Geolocalización -----
        my_location: "Mi Ubicación",
        follow_location: "Seguir Posición",
        stop_following: "Dejar de Seguir",
        location_active: "Ubicación activa",
        location_denied: "Permiso de ubicación denegado",
        
        // ----- Checklist Items -----
        checklist_documents: "Documentos (DNI, Pasaporte)",
        checklist_charger: "Cargador del móvil",
        checklist_underwear: "Ropa interior",
        checklist_toiletries: "Cepillo de dientes/pasta",
        checklist_medications: "Medicamentos esenciales",
        checklist_confirm_reservations: "Confirmar reservas",
        checklist_online_checkin: "Hacer check-in online",
        checklist_notify_bank: "Informar al banco del viaje",
        
        // ----- General / App -----
        app_name: "ToTravel",
        tagline: "Planifica. Viaja. Recuerda.",
        welcome_title: "Bienvenido a ToTravel",
        welcome_subtitle: "Tu compañero de viaje desde el primer sueño hasta el último recuerdo",
        start_planning: "Comenzar a Planificar",
        know_app: "Ya conozco la app",
        all_in_one: "Todo en un solo lugar",
        organize_text: "Organiza tu itinerario, presupuesto, listas y memorias en una plataforma intuitiva.",
        continue: "Continuar",
        take_everywhere: "Llévalo a todas partes",
        offline_text: "Accede a tus planes offline durante el viaje. ¡Sin internet, sin estrés!",
        explore: "Explorar ToTravel",
        offline_mode: "Modo Offline",
        loading: "Cargando...",
        saving: "Guardando...",
        
        // ----- Templates -----
        choose_template: "Elige una Plantilla",
        start_predefined: "Comienza con un itinerario predefinido y personaliza",
        template_romance: "Escapada Romántica",
        special_dinners: "Cenas especiales",
        sunset: "Atardecer",
        template_adventure: "Aventura en la Naturaleza",
        camping: "Camping",
        template_family: "Vacaciones en Familia",
        kids_activities: "Actividades niños",
        relax: "Relax",
        culture: "Cultura",
        gastronomy: "Gastronomía",
        template_beach: "Relax en la Playa",
        sun: "Sol",
        sea: "Mar",
        rest: "Descanso",
        start_scratch: "Empezar desde Cero",
        create_own: "Crea tu propio itinerario",
        
        // ----- Trip -----
        new_trip: "Nuevo Viaje",
        new_trip_short: "Nuevo Viaje",
        start_adventure: "Comienza a planificar tu próxima aventura",
        trip_name: "Nombre del Viaje *",
        ex_paris: "ej: Aventura en París",
        start_date: "Fecha Inicio *",
        end_date: "Fecha Fin *",
        destination: "Ciudad Destino *",
        start_typing: "Empieza a escribir...",
        budget: "Presupuesto Estimado",
        budget_label: "Presupuesto",
        cancel: "Cancelar",
        create_trip: "Crear Viaje",
        select_trip: "Selecciona un viaje...",
        create_trip_first: "¡Crea un viaje primero!",
        select_trip_first: "¡Selecciona un viaje primero!",
        trip_created: "¡Viaje creado con éxito!",
        
        // ----- Places -----
        add_to_itinerary: "Añadir al Itinerario",
        edit_place: "Editar Lugar",
        place: "Lugar *",
        places: "lugares",
        place_name: "Nombre del lugar",
        address: "Dirección",
        search_address: "Buscar dirección...",
        stay_dates: "Fechas de Estancia",
        check_in: "Check-in",
        check_out: "Check-out",
        nights: "noche(s)",
        checkin_after_checkout: "El check-out debe ser después del check-in",
        
        // ----- Transport -----
        transport_mode: "Medio de Transporte *",
        walking: "A Pie",
        car: "Coche",
        ride_app: "App",
        flight: "Vuelo",
        
        // ----- Categories -----
        category: "Categoría",
        hotel: "Hotel",
        restaurant: "Restaurante",
        attraction: "Atracción",
        airport: "Aeropuerto",
        transport: "Transporte",
        other: "Otro",
        
        // ----- Time -----
        day: "Día",
        days: "días",
        start: "Inicio",
        end: "Fin",
        time: "Tiempo",
        duration: "Duración",
        
        // ----- Costs -----
        activity_cost: "Coste de la Actividad",
        notes: "Notas",
        additional_info: "Información adicional...",
        add: "Añadir",
        added: "¡Añadido!",
        updated: "¡Actualizado!",
        removed: "Eliminado",
        add_place: "Añadir Lugar",
        no_places: "Sin lugares planificados",
        no_places_timeline: "Añade lugares a tu itinerario para ver la timeline",
        confirm_delete: "¿Eliminar este lugar?",
        
        // ----- Memories -----
        memory_album: "Álbum de Recuerdos",
        save_moments: "Guarda los mejores momentos de tu viaje",
        add_photos: "Añadir Fotos",
        click_upload: "Click para subir fotos",
        or_drag: "o arrastra aquí",
        photos_added: "foto(s) añadida(s)",
        no_photos: "Aún sin fotos. ¡Añade tus recuerdos!",
        
        // ----- Export / Share -----
        share_trip: "Compartir Viaje",
        export_share: "Exporta o comparte tu itinerario",
        export_pdf: "Exportar PDF",
        professional_report: "Informe profesional del viaje",
        save_file: "Guardar Archivo",
        share_link: "Compartir Enlace",
        send_companions: "Enviar a compañeros",
        close: "Cerrar",
        saved: "¡Guardado!",
        link_shared: "¡Enlace compartido!",
        link_copied: "¡Enlace copiado!",
        copy_link: "Copia este enlace:",
        check_itinerary: "Mira mi itinerario para",
        trip_too_large: "Viaje demasiado grande para compartir por enlace. Usa exportar archivo.",
        generating: "generando...",
        
        // ----- Import -----
        load_trip: "Cargar Viaje",
        select_file: "Seleccionar Archivo",
        or: "o",
        paste_code: "Pega el código del viaje aquí...",
        import: "Importar",
        imported: "¡Importado!",
        paste_first: "¡Pega los datos primero!",
        
        // ----- Expenses -----
        register_expense: "Registrar Gasto",
        register_expense_short: "Registrar Gasto",
        description: "Descripción",
        ex_dinner: "ej: Cena",
        amount: "Importe",
        expense_registered: "¡Gasto registrado!",
        fill_desc_amount: "¡Rellena descripción e importe!",
        spent: "Gastado",
        remaining: "Restante",
        by_category: "Por Categoría",
        recent_expenses: "Gastos Recientes",
        
        // ----- Expense Categories -----
        food: "Comida",
        shopping: "Compras",
        activities: "Actividades",
        accommodation: "Alojamiento",
        other_cat: "Otro",
        
        // ----- Tabs -----
        itinerary: "Itinerario",
        itinerary_short: "Itinerario",
        timeline: "Timeline",
        time_short: "Hora",
        budget_tab: "Presupuesto",
        budget_short: "Presupuesto",
        stats: "Estadísticas",
        expense_short: "Gasto",
        
        // ----- Checklists -----
        checklists_notes: "Listas & Notas",
        packing_list: "Maleta de Viaje",
        to_do: "Por Hacer",
        trip_notes: "Notas del Viaje",
        notes_placeholder: "Notas importantes, ideas, recordatorios...",
        new_item: "Nuevo item:",
        item_added: "¡Item añadido!",
        
        // ----- Map / Statistics -----
        loading_map: "Cargando mapa...",
        distance: "Distancia",
        segments: "Segmentos",
        total_distance: "Distancia Total",
        travel_time: "Tiempo de Desplazamiento",
        places_visited: "Lugares Visitados",
        by_transport: "Por Modo de Transporte",
        trip_summary: "Resumen del Viaje",
        summary: "Resumen",
        generated_by: "Generado por ToTravel",
        
        // ----- Validations -----
        required_field: "Campo obligatorio",
        invalid_date: "Fecha inválida",
        start_before_end: "¡La fecha de inicio debe ser anterior a la fecha de fin!",
        
        // ----- Actions -----
        save: "Guardar",
        edit: "Editar",
        delete: "Eliminar",
        back: "Volver",
        next: "Siguiente",
        finish: "Terminar",

        // ----- NUEVAS CLAVES PARA MODAL DE DETALLES -----
        place_details: "Detalles del Lugar",
        error_loading_details: "Error al cargar detalles"
    }
};

/**
 * Configurações de idioma
 */
const LANGUAGE_CONFIG = {
    default: 'pt',
    available: ['pt', 'en', 'es'],
    flags: {
        pt: '🇵🇹',
        en: '🇬🇧',
        es: '🇪🇸'
    },
    codes: {
        pt: 'PT',
        en: 'EN',
        es: 'ES'
    },
    names: {
        pt: 'Português',
        en: 'English',
        es: 'Español'
    },
    locales: {
        pt: 'pt-PT',
        en: 'en-GB',
        es: 'es-ES'
    }
};

/**
 * Verifica se o idioma já foi selecionado
 * @returns {boolean}
 */
function hasLanguageBeenSelected() {
    return localStorage.getItem('totravel_language_selected') === 'true';
}

/**
 * Marca o idioma como selecionado
 */
function markLanguageAsSelected() {
    localStorage.setItem('totravel_language_selected', 'true');
}

/**
 * Obtém o idioma atual do localStorage ou detecta do navegador
 * @returns {string} Código do idioma (pt, en, es)
 */
function getCurrentLanguage() {
    const stored = localStorage.getItem('totravel_language');
    if (stored && LANGUAGE_CONFIG.available.includes(stored)) {
        return stored;
    }
    
    // Detecção automática do navegador
    const browserLang = navigator.language?.substring(0, 2);
    if (browserLang && LANGUAGE_CONFIG.available.includes(browserLang)) {
        return browserLang;
    }
    
    return LANGUAGE_CONFIG.default;
}

/**
 * Variável global do idioma atual
 */
let currentLanguage = getCurrentLanguage();

/**
 * Função de tradução principal
 * @param {string} key - Chave da tradução
 * @param {string} lang - Idioma opcional (usa o atual se não especificado)
 * @returns {string} Texto traduzido ou a chave se não encontrada
 */
function t(key, lang = null) {
    const targetLang = lang || currentLanguage;
    const translations = TRANSLATIONS[targetLang];
    
    if (translations && translations[key]) {
        return translations[key];
    }
    
    // Fallback para português
    if (targetLang !== 'pt' && TRANSLATIONS.pt[key]) {
        return TRANSLATIONS.pt[key];
    }
    
    return key;
}

/**
 * Atualiza o idioma atual e salva no localStorage
 * @param {string} lang - Código do idioma (pt, en, es)
 */
function changeLanguage(lang) {
    if (!LANGUAGE_CONFIG.available.includes(lang)) {
        console.warn(`Idioma não suportado: ${lang}`);
        return;
    }
    
    currentLanguage = lang;
    localStorage.setItem('totravel_language', lang);
    markLanguageAsSelected();
    
    // Atualizar UI do seletor
    updateLanguageUI();
    
    // Atualizar todas as traduções na página com fade suave
    updateTranslations();
    
    // Atualizar classes ativas no dropdown
    document.querySelectorAll('.language-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === lang);
    });
    
    // Fechar dropdown
    const dropdown = document.getElementById('languageDropdown');
    if (dropdown) dropdown.classList.remove('show');
    
    // Mostrar toast de confirmação
    showToast(t('language_changed'));
}

/**
 * Atualiza a interface do seletor de idioma
 */
function updateLanguageUI() {
    const flagEl = document.getElementById('currentLangFlag');
    const codeEl = document.getElementById('currentLangCode');
    
    if (flagEl) flagEl.textContent = LANGUAGE_CONFIG.flags[currentLanguage];
    if (codeEl) codeEl.textContent = LANGUAGE_CONFIG.codes[currentLanguage];
}

/**
 * Atualiza todas as traduções na página com efeito de fade suave
 */
function updateTranslations() {
    const texts = TRANSLATIONS[currentLanguage];
    
    // Aplicar fade out
    document.body.classList.add('lang-transition');
    
    setTimeout(() => {
        // Atualizar elementos com data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (texts[key]) {
                el.textContent = texts[key];
            }
        });
        
        // Atualizar placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (texts[key]) {
                el.placeholder = texts[key];
            }
        });
        
        // Atualizar atributos title
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.dataset.i18nTitle;
            if (texts[key]) {
                el.title = texts[key];
            }
        });
        
        // Atualizar checklists (se a função existir)
        if (typeof window.updateChecklistTranslations === 'function') {
            window.updateChecklistTranslations();
        }
        if (typeof window.loadChecklists === 'function') {
            window.loadChecklists();
        }
        
        // Remover fade
        document.body.classList.remove('lang-transition');
    }, 150);
}

/**
 * Alterna a visibilidade do dropdown de idiomas
 */
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    if (dropdown) dropdown.classList.toggle('show');
}

/**
 * Mostra o seletor de idioma como primeira ação
 */
function showLanguageSelector() {
    const modal = document.getElementById('languageSelectorModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.remove('hidden');
    }
}

/**
 * Esconde o seletor de idioma e continua para a app
 */
function hideLanguageSelector() {
    const modal = document.getElementById('languageSelectorModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.add('hidden');
    }
}

// ============================================================================
// FUNÇÃO initializeApp ADICIONADA PARA RESOLVER O ERRO "initializeApp is not defined"
// ============================================================================

/**
 * Inicializa a aplicação principal
 * (Movida do index.html para garantir disponibilidade antes da chamada em selectInitialLanguage)
 */
function initializeApp() {
    // Carregar viagens do localStorage
    if (typeof loadTripsFromStorage === 'function') {
        loadTripsFromStorage();
    }
    
    if (typeof updateTripSelector === 'function') {
        updateTripSelector();
    }
    
    // Inicializar sistema de tradução
    initI18n();
    
    // Mostrar app
    const app = document.getElementById('app');
    if (app) {
        app.classList.remove('hidden');
    }
    
    // Verificar se há viagens
    if (typeof trips !== 'undefined' && trips.length > 0) {
        if (typeof switchTrip === 'function') {
            switchTrip(trips[0].id);
        }
    } else {
        if (typeof showWelcomeState === 'function') {
            showWelcomeState();
        }
    }
    
    // Setup de detecção offline
    if (typeof setupOfflineDetection === 'function') {
        setupOfflineDetection();
    }
    
    // Setup de handlers de modais
    if (typeof setupModalHandlers === 'function') {
        setupModalHandlers();
    }
    
    // Inicializar autocomplete após delay
    setTimeout(function() {
        if (typeof initNewTripAutocomplete === 'function') {
            initNewTripAutocomplete();
        }
    }, 1500);
}

// Garantir disponibilidade global
window.initializeApp = initializeApp;

// ============================================================================
// FIM DA FUNÇÃO ADICIONADA
// ============================================================================

/**
 * Seleciona o idioma inicial e continua
 * @param {string} lang - Código do idioma
 */
function selectInitialLanguage(lang) {
    changeLanguage(lang);
    hideLanguageSelector();
    
    // Agora initializeApp já está definida
    initializeApp();
}

/**
 * Inicializa o sistema de tradução
 */
function initI18n() {
    updateLanguageUI();
    updateTranslations();
    
    // Fechar dropdown ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.language-selector')) {
            const dropdown = document.getElementById('languageDropdown');
            if (dropdown) dropdown.classList.remove('show');
        }
    });
}

// Exportar para uso global
window.TRANSLATIONS = TRANSLATIONS;
window.LANGUAGE_CONFIG = LANGUAGE_CONFIG;
window.t = t;
window.changeLanguage = changeLanguage;
window.updateLanguageUI = updateLanguageUI;
window.updateTranslations = updateTranslations;
window.toggleLanguageDropdown = toggleLanguageDropdown;
window.initI18n = initI18n;
window.getCurrentLanguage = getCurrentLanguage;
window.hasLanguageBeenSelected = hasLanguageBeenSelected;
window.markLanguageAsSelected = markLanguageAsSelected;
window.showLanguageSelector = showLanguageSelector;
window.hideLanguageSelector = hideLanguageSelector;
window.selectInitialLanguage = selectInitialLanguage;

// Função showToast (será definida no index.html, mas declarada aqui para referência)
window.showToast = window.showToast || function(message, type = 'success') {
    console.log(`[${type}] ${message}`);
};