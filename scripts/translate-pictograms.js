/**
 * Traduce las claves de palabras en los archivos de pictogramas para los 8 idiomas
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '..', 'src', 'data')

// ============================================================
// TRADUCCIONES: español -> cada idioma
// ============================================================

const TRANSLATIONS = {
  en: {
    // animales
    perro: 'dog', gato: 'cat', pájaro: 'bird', pez: 'fish',
    caballo: 'horse', vaca: 'cow', toro: 'bull', oveja: 'sheep',
    cerdo: 'pig', conejo: 'rabbit', ratón: 'mouse', elefante: 'elephant',
    león: 'lion', tigre: 'tiger', oso: 'bear', lobo: 'wolf',
    zorro: 'fox', mono: 'monkey', serpiente: 'snake', tortuga: 'turtle',
    rana: 'frog', cocodrilo: 'crocodile', ballena: 'whale', delfín: 'dolphin',
    tiburón: 'shark', pulpo: 'octopus', cangrejo: 'crab',
    langosta: 'lobster', caracol: 'snail', mariposa: 'butterfly',
    abeja: 'bee', hormiga: 'ant', araña: 'spider', escorpión: 'scorpion',
    mosquito: 'mosquito', cucaracha: 'cockroach', murciélago: 'bat',
    águila: 'eagle', búho: 'owl', loro: 'parrot', pato: 'duck',
    gallina: 'hen', gallo: 'rooster', pollito: 'chick', pavo: 'turkey',
    cisne: 'swan', pingüino: 'penguin', camello: 'camel', jirafa: 'giraffe',
    cebra: 'zebra', hipopótamo: 'hippopotamus', rinoceronte: 'rhinoceros',
    koala: 'koala', panda: 'panda', ardilla: 'squirrel', erizo: 'hedgehog',
    cabra: 'goat', burro: 'donkey', flamenco: 'flamingo',
    pavo_real: 'peacock', colibrí: 'hummingbird', avestruz: 'ostrich',
    cuco: 'cuckoo', gaviota: 'seagull', paloma: 'pigeon', cuervo: 'crow',
    lagarto: 'lizard', camaleón: 'chameleon', salamandra: 'salamander',
    culebra: 'snake', víbora: 'viper', dromedario: 'dromedary',
    llama: 'llama', alpaca: 'alpaca', hurón: 'ferret', hámster: 'hamster',
    cobaya: 'guinea_pig', chimpancé: 'chimpanzee', gorila: 'gorilla',
    orangután: 'orangutan', lémur: 'lemur', nutria: 'otter',
    mofeta: 'skunk', castor: 'beaver', jabalí: 'boar', ciervo: 'deer',
    alce: 'moose', bisonte: 'bison', foca: 'seal', morsa: 'walrus',
    león_marino: 'sea_lion', orca: 'orca', calamar: 'squid',
    medusa: 'jellyfish', estrella_de_mar: 'starfish',
    caballito_de_mar: 'seahorse', mariquita: 'ladybug',
    libélula: 'dragonfly', saltamontes: 'grasshopper', grillo: 'cricket',
    cigarra: 'cicada', luciérnaga: 'firefly', polilla: 'moth',
    oruga: 'caterpillar', gusano: 'worm', caracol_insecto: 'insect_snail',
    lombriz: 'earthworm', avispa: 'wasp', tábano: 'horsefly',
    pulga: 'flea', piojo: 'louse', anémona: 'anemone', coral: 'coral',
    narval: 'narwhal', beluga: 'beluga', cachalote: 'sperm_whale',
    manatí: 'manatee', dugongo: 'dugong', nutria_marina: 'sea_otter',
    pingüino_emperador: 'emperor_penguin', albatros: 'albatross',
    gaviota_mar: 'sea_gull', pelícano: 'pelican', cigüeña: 'stork',
    garza: 'heron', tucán: 'toucan', colibrí_ave: 'hummingbird_bird',
    halcón: 'falcon', buitre: 'vulture', urraca: 'magpie',
    canario: 'canary', periquito: 'budgie', loro_hablador: 'talking_parrot',

    // alimentos
    agua: 'water', pan: 'bread', leche: 'milk', fruta: 'fruit',
    manzana: 'apple', naranja: 'orange', plátano: 'banana', uva: 'grape',
    fresa: 'strawberry', pera: 'pear', sandía: 'watermelon', melón: 'melon',
    limón: 'lemon', cereza: 'cherry', tomate: 'tomato', lechuga: 'lettuce',
    zanahoria: 'carrot', patata: 'potato', cebolla: 'onion', ajo: 'garlic',
    pimiento: 'pepper', brócoli: 'broccoli', arroz: 'rice', pasta: 'pasta',
    huevo: 'egg', queso: 'cheese', yogur: 'yogurt', carne: 'meat',
    pollo: 'chicken', pescado: 'fish', jamón: 'ham', sopa: 'soup',
    ensalada: 'salad', galleta: 'cookie', pastel: 'cake', chocolate: 'chocolate',
    helado: 'ice_cream', bizcocho: 'sponge_cake', miel: 'honey',
    mantequilla: 'butter', aceite: 'oil', sal: 'salt', azúcar: 'sugar',
    café: 'coffee', té: 'tea', zumo: 'juice', lechuga: 'lettuce',
    espinacas: 'spinach', judías: 'beans', garbanzos: 'chickpeas',
    lentejas: 'lentils', maíz: 'corn', trigo: 'wheat', avena: 'oats',
    nuez: 'walnut', almendra: 'almond', avellana: 'hazelnut',
    pistacho: 'pistachio', cacahuete: 'peanut', fresa: 'strawberry',
    frambuesa: 'raspberry', arándano: 'blueberry', mora: 'blackberry',
    piña: 'pineapple', mango: 'mango', kiwi: 'kiwi', papaya: 'papaya',
    coco: 'coconut', aguacate: 'avocado', calabaza: 'pumpkin',
    berenjena: 'eggplant', calabacín: 'zucchini', espárrago: 'asparagus',
    coliflor: 'cauliflower', repollo: 'cabbage', pepino: 'cucumber',
    remolacha: 'beetroot', rábano: 'radish', puerro: 'leek',
    champiñón: 'mushroom', seta: 'mushroom', tofu: 'tofu',
    salsa: 'sauce', vinagre: 'vinegar', mayonesa: 'mayonnaise',
    mostaza: 'mustard', ketchup: 'ketchup', mermelada: 'jam',
    natillas: 'custard', flan: 'caramel_custard', arroz_con_leche: 'rice_pudding',
    tortilla: 'omelette', bocadillo: 'sandwich', pizza: 'pizza',
    hamburguesa: 'hamburger', patatas_fritas: 'french_fries',
    lentejas: 'lentils', filete: 'steak', salchicha: 'sausage',
    tocino: 'bacon', costilla: 'rib', chuleta: 'chop', pescado: 'fish',
    marisco: 'seafood', gamba: 'shrimp', mejillón: 'mussel',
    almeja: 'clam', pulpo: 'octopus', calamar: 'squid', atún: 'tuna',
    salmón: 'salmon', bacalao: 'cod', merluza: 'hake', dorada: 'gilt_head_bream',
    lubina: 'sea_bass', boquerón: 'anchovy', sardina: 'sardine',

    // casa
    casa: 'house', puerta: 'door', ventana: 'window', cocina: 'kitchen',
    dormitorio: 'bedroom', baño: 'bathroom', salón: 'living_room',
    comedor: 'dining_room', cama: 'bed', mesa: 'table', silla: 'chair',
    armario: 'wardrobe', nevera: 'fridge', lavadora: 'washing_machine',
    lavavajillas: 'dishwasher', horno: 'oven', microondas: 'microwave',
    sofá: 'sofa', lámpara: 'lamp', estantería: 'bookshelf',
    escalera: 'stairs', tejado: 'roof', pared: 'wall', suelo: 'floor',
    techo: 'ceiling', llave: 'key', cerradura: 'lock', timbre: 'doorbell',
    jardín: 'garden', terraza: 'terrace', balcón: 'balcony', garaje: 'garage',
    sótano: 'basement', desván: 'attic', pasillo: 'hallway',
    escalón: 'step', alfombra: 'carpet', cortina: 'curtain', cojín: 'cushion',
    manta: 'blanket', almohada: 'pillow', sábana: 'sheet', toalla: 'towel',
    espejo: 'mirror', cuadro: 'painting', florero: 'vase', reloj: 'clock',
    teléfono: 'telephone', enchufe: 'socket', interruptor: 'switch',
    radiador: 'radiator', calefacción: 'heating', aire_acondicionado: 'air_conditioner',
    grifo: 'tap', ducha: 'shower', bañera: 'bathtub', inodoro: 'toilet',
    lavabo: 'sink', bidé: 'bidet', papel_higiénico: 'toilet_paper',
    jabón: 'soap', champú: 'shampoo', cepillo_dientes: 'toothbrush',
    pasta_dientes: 'toothpaste', peine: 'comb', secador: 'hair_dryer',
    plancha: 'iron', tabla_planchar: 'ironing_board', cesto_ropa: 'laundry_basket',
    percha: 'hanger', zapatero: 'shoe_rack', cajón: 'drawer',
    mesilla: 'nightstand', escritorio: 'desk', ordenador: 'computer',
    impresora: 'printer', lámpara_mesa: 'desk_lamp', papelera: 'wastebasket',
    estufa: 'stove', fogones: 'hob', campana: 'hood', fregadero: 'kitchen_sink',
    encimera: 'countertop', armario_cocina: 'kitchen_cabinet',
    despensa: 'pantry', tabla_cortar: 'cutting_board', cuchillo: 'knife',
    tenedor: 'fork', cuchara: 'spoon', cucharón: 'ladle', olla: 'pot',
    sartén: 'frying_pan', bandeja: 'tray', vaso: 'glass', taza: 'cup',
    plato: 'plate', bol: 'bowl', jarra: 'jug', botella: 'bottle',
    servilleta: 'napkin', mantel: 'tablecloth',

    // naturaleza
    sol: 'sun', luna: 'moon', estrella: 'star', cielo: 'sky',
    nube: 'cloud', lluvia: 'rain', nieve: 'snow', viento: 'wind',
    tormenta: 'storm', trueno: 'thunder', rayo: 'lightning', arcoíris: 'rainbow',
    granizo: 'hail', niebla: 'fog', rocío: 'dew', hielo: 'ice',
    calor: 'heat', frío: 'cold', montaña: 'mountain', valle: 'valley',
    colina: 'hill', río: 'river', lago: 'lake', mar: 'sea', océano: 'ocean',
    bosque: 'forest', árbol: 'tree', flor: 'flower', planta: 'plant',
    hoja: 'leaf', rama: 'branch', tronco: 'trunk', raíz: 'root',
    semilla: 'seed', fruto: 'fruit', hierba: 'grass', musgo: 'moss',
    desierto: 'desert', selva: 'jungle', campo: 'field', pradera: 'meadow',
    piedra: 'stone', roca: 'rock', arena: 'sand', tierra: 'earth',
    barro: 'mud', polvo: 'dust', fuego: 'fire', agua: 'water', aire: 'air',
    cascada: 'waterfall', volcán: 'volcano', isla: 'island', playa: 'beach',
    acantilado: 'cliff', cueva: 'cave', sendero: 'trail', camino: 'path',
    puente: 'bridge', lago: 'lake', estanque: 'pond', pantano: 'swamp',
    glaciar: 'glacier', aurora: 'aurora', eclipse: 'eclipse',
    amanecer: 'sunrise', atardecer: 'sunset', mediodía: 'noon',
    medianoche: 'midnight',

    // ciudad
    ciudad: 'city', pueblo: 'town', calle: 'street', avenida: 'avenue',
    plaza: 'square', parque: 'park', jardín: 'garden', edificio: 'building',
    casa: 'house', tienda: 'shop', mercado: 'market', supermercado: 'supermarket',
    farmacia: 'pharmacy', hospital: 'hospital', colegio: 'school',
    universidad: 'university', biblioteca: 'library', museo: 'museum',
    teatro: 'theater', cine: 'cinema', iglesia: 'church', banco: 'bank',
    oficina: 'office', restaurante: 'restaurant', cafetería: 'cafe',
    panadería: 'bakery', carnicería: 'butcher', frutería: 'fruit_shop',
    librería: 'bookshop', papelería: 'stationery', peluquería: 'hairdresser',
    lavandería: 'laundry', gasolinera: 'gas_station', taller: 'workshop',
    aparcamiento: 'parking', semáforo: 'traffic_light', farola: 'street_lamp',
    banco: 'bench', fuente: 'fountain', estatua: 'statue', puente: 'bridge',
    río: 'river', acera: 'sidewalk', carretera: 'road', autopista: 'highway',
    rotonda: 'roundabout', paso_peatones: 'crosswalk', esquina: 'corner',
    número: 'number', código_postal: 'zip_code', dirección: 'address',
    mapa: 'map', señal: 'sign', transporte: 'transport', autobús: 'bus',
    parada: 'stop', estación: 'station', aeropuerto: 'airport',
    puerto: 'port', metro: 'subway', tren: 'train', taxi: 'taxi',
    bicicleta: 'bicycle', moto: 'motorcycle', coche: 'car',
    ambulancia: 'ambulance', camión: 'truck', furgoneta: 'van',
    policía: 'police', bombero: 'firefighter', cartero: 'mailman',
    basurero: 'garbage_truck', barrendero: 'street_sweeper',

    // cuerpo
    cabeza: 'head', ojo: 'eye', ojos: 'eyes', nariz: 'nose', boca: 'mouth',
    oreja: 'ear', orejas: 'ears', mano: 'hand', manos: 'hands',
    pie: 'foot', pies: 'feet', brazo: 'arm', brazos: 'arms',
    pierna: 'leg', piernas: 'legs', dedo: 'finger', dedos: 'fingers',
    rodilla: 'knee', rodillas: 'knees', codo: 'elbow', codos: 'elbows',
    hombro: 'shoulder', espalda: 'back', pecho: 'chest', barriga: 'belly',
    pelo: 'hair', piel: 'skin', lengua: 'tongue', diente: 'tooth',
    dientes: 'teeth', labio: 'lip', labios: 'lips', uña: 'nail',
    uñas: 'nails', ceja: 'eyebrow', pestaña: 'eyelash', mejilla: 'cheek',
    barbilla: 'chin', frente: 'forehead', cuello: 'neck', nuca: 'nape',
    muñeca: 'wrist', tobillo: 'ankle', cadera: 'hip', cintura: 'waist',
    muslo: 'thigh', pantorrilla: 'calf', talón: 'heel', planta: 'sole',

    // emociones
    feliz: 'happy', alegría: 'joy', contento: 'content', sonrisa: 'smile',
    triste: 'sad', tristeza: 'sadness', llanto: 'crying', lágrima: 'tear',
    miedo: 'fear', asustado: 'scared', miedo: 'fear', terror: 'terror',
    enfado: 'anger', enfadado: 'angry', furia: 'fury', rabia: 'rage',
    sorpresa: 'surprise', sorprendido: 'surprised', asombro: 'astonishment',
    amor: 'love', cariño: 'affection', abrazo: 'hug', beso: 'kiss',
    calma: 'calm', tranquilidad: 'tranquility', relax: 'relax',
    nervios: 'nerves', nervioso: 'nervous', ansiedad: 'anxiety',
    cansancio: 'tiredness', cansado: 'tired', aburrimiento: 'boredom',
    aburrido: 'bored', soledad: 'loneliness', solo: 'alone',
    confianza: 'trust', seguro: 'confident', orgullo: 'pride',
    vergüenza: 'shame', tímido: 'shy', culpa: 'guilt',
    esperanza: 'hope', ilusión: 'excitement',

    // escuela
    escuela: 'school', clase: 'class', aula: 'classroom', profesor: 'teacher',
    profesora: 'teacher_f', alumno: 'student', alumna: 'student_f',
    compañero: 'classmate', libro: 'book', cuaderno: 'notebook',
    folio: 'sheet', papel: 'paper', lápiz: 'pencil', bolígrafo: 'pen',
    goma: 'eraser', sacapuntas: 'sharpener', regla: 'ruler',
    tijeras: 'scissors', pegamento: 'glue', mochila: 'backpack',
    estuche: 'pencil_case', pizarra: 'blackboard', tiza: 'chalk',
    rotulador: 'marker', ceras: 'crayons', acuarela: 'watercolor',
    pintura: 'paint', pincel: 'brush', examen: 'exam', prueba: 'test',
    nota: 'grade', aprobar: 'pass', suspender: 'fail', tarea: 'homework',
    deberes: 'homework', ejercicio: 'exercise', leer: 'read',
    lectura: 'reading', escribir: 'write', escritura: 'writing',
    dibujar: 'draw', dibujo: 'drawing', letra: 'letter', palabra: 'word',
    cuento: 'story', diccionario: 'dictionary', biblioteca: 'library',
    matemáticas: 'math', lengua: 'language', ciencias: 'science',
    historia: 'history', geografía: 'geography', música: 'music',
    arte: 'art', educación_física: 'physical_education',
    recreo: 'recess', patio: 'playground', campana: 'bell',
    horario: 'schedule', asignatura: 'subject', curso: 'grade',
    número: 'number', suma: 'addition', resta: 'subtraction',
    multiplicación: 'multiplication', división: 'division',

    // familia
    madre: 'mother', padre: 'father', padres: 'parents', hijo: 'son',
    hija: 'daughter', hijos: 'children', hermano: 'brother',
    hermana: 'sister', hermanos: 'siblings', abuelo: 'grandfather',
    abuela: 'grandmother', abuelos: 'grandparents', nieto: 'grandson',
    nieta: 'granddaughter', tío: 'uncle', tía: 'aunt', primo: 'cousin_m',
    prima: 'cousin_f', sobrino: 'nephew', sobrina: 'niece',
    marido: 'husband', mujer: 'wife', esposo: 'spouse_m',
    esposa: 'spouse_f', pareja: 'partner', novio: 'boyfriend',
    novia: 'girlfriend', bebé: 'baby', niño: 'boy', niña: 'girl',
    adulto: 'adult', anciano: 'elderly_m', anciana: 'elderly_f',
    familia: 'family', padrastro: 'stepfather', madrastra: 'stepmother',
    hermanastro: 'stepbrother', hermanastra: 'stepsister',
    padrino: 'godfather', madrina: 'godmother', ahijado: 'godson',
    ahijada: 'goddaughter', cuñado: 'brother_in_law',
    cuñada: 'sister_in_law', suegro: 'father_in_law',
    suegra: 'mother_in_law', yerno: 'son_in_law', nuera: 'daughter_in_law',
    prometido: 'fiancé', prometida: 'fiancée',

    // profesiones
    médico: 'doctor', médica: 'doctor_f', enfermero: 'nurse_m',
    enfermera: 'nurse', profesor: 'teacher', profesora: 'teacher_f',
    bombero: 'firefighter', policía: 'police_officer', piloto: 'pilot',
    conductor: 'driver', carpintero: 'carpenter', fontanero: 'plumber',
    electricista: 'electrician', mecánico: 'mechanic', albañil: 'builder',
    pintor: 'painter', arquitecto: 'architect', ingeniero: 'engineer',
    abogado: 'lawyer', juez: 'judge', periodista: 'journalist',
    escritor: 'writer', artista: 'artist', músico: 'musician',
    cantante: 'singer', actor: 'actor', actriz: 'actress',
    cocinero: 'chef', camarero: 'waiter', camarera: 'waitress',
    panadero: 'baker', carnicero: 'butcher', frutero: 'greengrocer',
    librero: 'bookseller', farmacéutico: 'pharmacist', veterinario: 'veterinarian',
    dentista: 'dentist', psicólogo: 'psychologist', peluquero: 'hairdresser',
    jardinero: 'gardener', granjero: 'farmer', pescador: 'fisherman',
    soldado: 'soldier', marinero: 'sailor', astronauta: 'astronaut',

    // ropa
    camisa: 'shirt', camiseta: 't_shirt', pantalón: 'pants',
    pantalones: 'trousers', falda: 'skirt', vestido: 'dress',
    chaqueta: 'jacket', abrigo: 'coat', jersey: 'sweater', sudadera: 'hoodie',
    zapatos: 'shoes', zapatillas: 'sneakers', botas: 'boots',
    sandalias: 'sandals', calcetines: 'socks', medias: 'tights',
    gorro: 'hat', sombrero: 'hat', bufanda: 'scarf', guantes: 'gloves',
    cinturón: 'belt', corbata: 'tie', pajarita: 'bow_tie',
    bañador: 'swimsuit', bikini: 'bikini', pijama: 'pajamas',
    bata: 'robe', albornoz: 'bathrobe', paraguas: 'umbrella',
    mochila: 'backpack', bolso: 'handbag', cartera: 'wallet',
    reloj: 'watch', gafas: 'glasses', anillo: 'ring', collar: 'necklace',
    pulsera: 'bracelet', pendientes: 'earrings',

    // tecnología
    ordenador: 'computer', portátil: 'laptop', teléfono: 'telephone',
    móvil: 'mobile', tablet: 'tablet', televisión: 'television',
    radio: 'radio', altavoz: 'speaker', auriculares: 'headphones',
    cámara: 'camera', videocámara: 'camcorder', impresora: 'printer',
    escáner: 'scanner', router: 'router', wifi: 'wifi', teclado: 'keyboard',
    ratón: 'mouse', pantalla: 'screen', cargador: 'charger',
    batería: 'battery', USB: 'usb', disco_duro: 'hard_drive',
    memoria: 'memory', procesador: 'processor', programa: 'program',
    aplicación: 'application', internet: 'internet', correo: 'email',
    contraseña: 'password',

    // transporte
    coche: 'car', camión: 'truck', autobús: 'bus', moto: 'motorcycle',
    bicicleta: 'bicycle', patinete: 'scooter', tren: 'train', metro: 'subway',
    tranvía: 'tram', avión: 'airplane', helicóptero: 'helicopter',
    barco: 'boat', velero: 'sailboat', yate: 'yacht', submarino: 'submarine',
    taxi: 'taxi', ambulancia: 'ambulance', camión_bomberos: 'fire_truck',
    coche_policía: 'police_car', grúa: 'tow_truck', tractor: 'tractor',
    caravana: 'caravan', autocaravana: 'motorhome', moto_agua: 'jetski',
    globo: 'balloon', cohete: 'rocket', nave_espacial: 'spaceship',
    monopatín: 'skateboard', patines: 'skates', silla_ruedas: 'wheelchair',
    andamio: 'scaffold', ascensor: 'elevator', escalera_mecánica: 'escalator',

    // acciones
    comer: 'eat', beber: 'drink', dormir: 'sleep', despertar: 'wake_up',
    lavar: 'wash', vestir: 'dress', desvestir: 'undress', peinar: 'comb',
    cocinar: 'cook', freír: 'fry', hervir: 'boil', asar: 'roast',
    limpiar: 'clean', barrer: 'sweep', fregar: 'scrub', planchar: 'iron',
    tender: 'hang', guardar: 'save', ordenar: 'tidy', leer: 'read',
    escribir: 'write', dibujar: 'draw', pintar: 'paint', cantar: 'sing',
    bailar: 'dance', saltar: 'jump', correr: 'run', caminar: 'walk',
    nadar: 'swim', volar: 'fly', reír: 'laugh', llorar: 'cry',
    gritar: 'shout', hablar: 'talk', callar: 'be_quiet', escuchar: 'listen',
    mirar: 'look', ver: 'see', oler: 'smell', tocar: 'touch',
    gustar: 'like', amar: 'love', querer: 'want', odiar: 'hate',
    comprar: 'buy', vender: 'sell', pagar: 'pay', cobrar: 'charge',
    abrir: 'open', cerrar: 'close', encender: 'turn_on', apagar: 'turn_off',
    subir: 'go_up', bajar: 'go_down', entrar: 'enter', salir: 'exit',
    venir: 'come', ir: 'go', traer: 'bring', llevar: 'take',
    dar: 'give', recibir: 'receive', enviar: 'send', recoger: 'pick_up',
    dejar: 'leave', poner: 'put', quitar: 'remove', romper: 'break',
    arreglar: 'fix', construir: 'build', crear: 'create', pensar: 'think',
    saber: 'know', aprender: 'learn', enseñar: 'teach', estudiar: 'study',
    trabajar: 'work', jugar: 'play', ganar: 'win', perder: 'lose',
    esperar: 'wait', encontrar: 'find', buscar: 'search', llamar: 'call',
    preguntar: 'ask', responder: 'answer', ayudar: 'help', cuidar: 'care_for',
    sentar: 'sit', levantar: 'stand_up', acostar: 'lie_down', caer: 'fall',
    empujar: 'push', tirar: 'pull', coger: 'take', soltar: 'release',
    abrazar: 'hug', besar: 'kiss', sonreír: 'smile', llorar: 'cry',
  },

  // --- FRANÇAIS ---
  fr: {
    perro: 'chien', gato: 'chat', pájaro: 'oiseau', pez: 'poisson',
    caballo: 'cheval', vaca: 'vache', toro: 'taureau', oveja: 'mouton',
    cerdo: 'cochon', conejo: 'lapin', ratón: 'souris', elefante: 'éléphant',
    león: 'lion', tigre: 'tigre', oso: 'ours', lobo: 'loup',
    zorro: 'renard', mono: 'singe', serpiente: 'serpent', tortuga: 'tortue',
    rana: 'grenouille', cocodrilo: 'crocodile', ballena: 'baleine',
    delfín: 'dauphin', tiburón: 'requin', pulpo: 'pieuvre', cangrejo: 'crabe',
    langosta: 'homard', caracol: 'escargot', mariposa: 'papillon',
    abeja: 'abeille', hormiga: 'fourmi', araña: 'araignée',
    escorpión: 'scorpion', mosquito: 'moustique', cucaracha: 'cafard',
    murciélago: 'chauve_souris', águila: 'aigle', búho: 'hibou',
    loro: 'perroquet', pato: 'canard', gallina: 'poule', gallo: 'coq',
    pollito: 'poussin', pavo: 'dinde', cisne: 'cygne', pingüino: 'pingouin',
    camello: 'chameau', jirafa: 'girafe', cebra: 'zèbre',
    hipopótamo: 'hippopotame', rinoceronte: 'rhinocéros', koala: 'koala',
    panda: 'panda', ardilla: 'écureuil', erizo: 'hérisson', cabra: 'chèvre',
    burro: 'âne', flamenco: 'flamant', pavo_real: 'paon',
    colibrí: 'colibri', avestruz: 'autruche', cuco: 'coucou',
    gaviota: 'mouette', paloma: 'pigeon', cuervo: 'corbeau',
    lagarto: 'lézard', camaleón: 'caméléon', salamandra: 'salamandre',
    culebra: 'couleuvre', víbora: 'vipère', dromedario: 'dromadaire',
    llama: 'lama', alpaca: 'alpaga', hurón: 'furet', hámster: 'hamster',
    cobaya: 'cochon_dinde', chimpancé: 'chimpanzé', gorila: 'gorille',
    orangután: 'orang_outan', lémur: 'lémurien', nutria: 'loutre',
    mofeta: 'moufette', castor: 'castor', jabalí: 'sanglier',
    ciervo: 'cerf', alce: 'élan', bisonte: 'bison', foca: 'phoque',
    morsa: 'morse', león_marino: 'lion_de_mer', orca: 'orca',
    calamar: 'calmar', medusa: 'méduse', estrella_de_mar: 'étoile_de_mer',
    caballito_de_mar: 'hippocampe', mariquita: 'coccinelle',
    libélula: 'libellule', saltamontes: 'sauterelle', grillo: 'grillon',
    cigarra: 'cigale', luciérnaga: 'luciole', polilla: 'mite',
    oruga: 'chenille', gusano: 'ver', avispa: 'guêpe', tábano: 'taon',
    pulga: 'puce', piojo: 'pou',

    // Basic words for all categories
    agua: 'eau', pan: 'pain', leche: 'lait', fruta: 'fruit',
    manzana: 'pomme', naranja: 'orange', plátano: 'banane', uva: 'raisin',
    fresa: 'fraise', pera: 'poire', sandía: 'pastèque', melón: 'melon',
    limón: 'citron', cereza: 'cerise', tomate: 'tomate', lechuga: 'laitue',
    zanahoria: 'carotte', patata: 'pomme_de_terre', cebolla: 'oignon',
    ajo: 'ail', arroz: 'riz', huevo: 'œuf', queso: 'fromage',
    carne: 'viande', pollo: 'poulet', pescado: 'poisson', jamón: 'jambon',
    sopa: 'soupe', galleta: 'biscuit', pastel: 'gâteau', chocolate: 'chocolat',
    helado: 'glace', miel: 'miel', mantequilla: 'beurre',
    casa: 'maison', puerta: 'porte', ventana: 'fenêtre', cocina: 'cuisine',
    dormitorio: 'chambre', cama: 'lit', mesa: 'table', silla: 'chaise',
    armario: 'armoire', nevera: 'réfrigérateur', llave: 'clé',
    sol: 'soleil', luna: 'lune', estrella: 'étoile', cielo: 'ciel',
    nube: 'nuage', lluvia: 'pluie', nieve: 'neige', viento: 'vent',
    montaña: 'montagne', río: 'rivière', lago: 'lac', mar: 'mer',
    bosque: 'forêt', árbol: 'arbre', flor: 'fleur', planta: 'plante',
    ciudad: 'ville', calle: 'rue', parque: 'parc', tienda: 'magasin',
    escuela: 'école', libro: 'livre', profesor: 'professeur',
    alumno: 'élève', pizarra: 'tableau',
    cabeza: 'tête', ojo: 'œil', nariz: 'nez', boca: 'bouche',
    oreja: 'oreille', mano: 'main', pie: 'pied', brazo: 'bras',
    pierna: 'jambe', feliz: 'heureux', triste: 'triste',
    amor: 'amour', miedo: 'peur', madre: 'mère', padre: 'père',
    hijo: 'fils', hija: 'fille', hermano: 'frère', hermana: 'sœur',
    médico: 'médecin', policía: 'policier', bombero: 'pompier',
    panadero: 'boulanger', cocinero: 'cuisinier',
    camisa: 'chemise', pantalón: 'pantalon', zapatos: 'chaussures',
    vestido: 'robe', chaqueta: 'veste', abrigo: 'manteau',
    gorro: 'bonnet', bufanda: 'écharpe', guantes: 'gants',
    ordenador: 'ordinateur', teléfono: 'téléphone', móvil: 'portable',
    televisión: 'télévision', internet: 'internet',
    coche: 'voiture', camión: 'camion', tren: 'train', avión: 'avion',
    barco: 'bateau', bicicleta: 'vélo', moto: 'moto', autobús: 'bus',
    metro: 'métro', taxi: 'taxi',
    comer: 'manger', beber: 'boire', dormir: 'dormir', leer: 'lire',
    escribir: 'écrire', hablar: 'parler', correr: 'courir', saltar: 'sauter',
    jugar: 'jouer', cantar: 'chanter', bailar: 'danser', nadar: 'nager',
    mirar: 'regarder', escuchar: 'écouter', comprar: 'acheter',
    cocinar: 'cuisiner', limpiar: 'nettoyer', trabajar: 'travailler',
    estudiar: 'étudier', aprender: 'apprendre', enseñar: 'enseigner',
    abrir: 'ouvrir', cerrar: 'fermer',
    grande: 'grand', pequeño: 'petit', alto: 'haut', bajo: 'bas',
    rápido: 'rapide', lento: 'lent', bonito: 'joli', feo: 'laid',
    rojo: 'rouge', azul: 'bleu', amarillo: 'jaune', verde: 'vert',
    naranja_color: 'orange', negro: 'noir', blanco: 'blanc',
    bueno: 'bon', malo: 'mauvais',
    arriba: 'dessus', abajo: 'dessous', dentro: 'dedans', fuera: 'dehors',
    hola: 'bonjour', gracias: 'merci', adiós: 'au_revoir',
  },

  // --- PORTUGUÊS ---
  pt: {
    perro: 'cachorro', gato: 'gato', pájaro: 'pássaro', pez: 'peixe',
    caballo: 'cavalo', vaca: 'vaca', toro: 'touro', oveja: 'ovelha',
    cerdo: 'porco', conejo: 'coelho', ratón: 'rato', elefante: 'elefante',
    león: 'leão', tigre: 'tigre', oso: 'urso', lobo: 'lobo',
    zorro: 'raposa', mono: 'macaco', serpiente: 'serpente', tortuga: 'tartaruga',
    rana: 'sapo', cocodrilo: 'crocodilo', ballena: 'baleia',
    delfín: 'golfinho', tiburón: 'tubarão', pulpo: 'polvo',
    cangrejo: 'caranguejo', langosta: 'lagosta', caracol: 'caracol',
    mariposa: 'borboleta', abeja: 'abelha', hormiga: 'formiga',
    araña: 'aranha', escorpión: 'escorpião', mosquito: 'mosquito',
    cucaracha: 'barata', murciélago: 'morcego',
    águila: 'águia', búho: 'coruja', loro: 'papagaio', pato: 'pato',
    gallina: 'galinha', gallo: 'galo', pollito: 'pintinho', pavo: 'peru',
    cisne: 'cisne', pingüino: 'pinguim', camello: 'camelo',
    jirafa: 'girafa', cebra: 'zebra', hipopótamo: 'hipopótamo',
    panda: 'panda', ardilla: 'esquilo', erizo: 'ouriço',
    cabra: 'cabra', burro: 'burro',

    agua: 'água', pan: 'pão', leite: 'leite', fruta: 'fruta',
    manzana: 'maçã', naranja: 'laranja', plátano: 'banana', uva: 'uva',
    fresa: 'morango', tomate: 'tomate', lechuga: 'alface',
    zanahoria: 'cenoura', patata: 'batata', cebolla: 'cebola',
    ajo: 'alho', arroz: 'arroz', huevo: 'ovo', queso: 'queijo',
    carne: 'carne', pollo: 'frango', pescado: 'peixe', sopa: 'sopa',
    galleta: 'bolacha', pastel: 'bolo', chocolate: 'chocolate',
    helado: 'sorvete', miel: 'mel', mantequilla: 'manteiga',

    casa: 'casa', puerta: 'porta', ventana: 'janela', cocina: 'cozinha',
    dormitorio: 'quarto', baño: 'banheiro', cama: 'cama',
    mesa: 'mesa', silla: 'cadeira', armário: 'armário',
    nevera: 'geladeira', llave: 'chave',

    sol: 'sol', lua: 'lua', estrela: 'estrela', céu: 'céu',
    nuvem: 'nuvem', chuva: 'chuva', neve: 'neve', vento: 'vento',
    montanha: 'montanha', rio: 'rio', lago: 'lago', mar: 'mar',
    floresta: 'floresta', árvore: 'árvore', flor: 'flor',

    cidade: 'cidade', rua: 'rua', parque: 'parque', loja: 'loja',
    escola: 'escola', livro: 'livro', professor: 'professor',
    aluno: 'aluno', quadro: 'quadro',

    cabeça: 'cabeça', olho: 'olho', nariz: 'nariz', boca: 'boca',
    orelha: 'orelha', mão: 'mão', pé: 'pé', braço: 'braço',
    perna: 'perna',

    feliz: 'feliz', triste: 'triste', amor: 'amor', medo: 'medo',
    mãe: 'mãe', pai: 'pai', filho: 'filho', filha: 'filha',
    irmão: 'irmão', irmã: 'irmã',

    médico: 'médico', polícia: 'polícia', bombeiro: 'bombeiro',
    cozinheiro: 'cozinheiro', camisa: 'camisa', calça: 'calça',
    sapatos: 'sapatos', vestido: 'vestido', jaqueta: 'jaqueta',

    computador: 'computador', telefone: 'telefone', celular: 'celular',
    televisão: 'televisão', internet: 'internet',

    carro: 'carro', caminhão: 'caminhão', trem: 'trem', avião: 'avião',
    barco: 'barco', bicicleta: 'bicicleta', moto: 'moto',
    ônibus: 'ônibus', metrô: 'metrô', táxi: 'táxi',

    comer: 'comer', beber: 'beber', dormir: 'dormir', ler: 'ler',
    escrever: 'escrever', falar: 'falar', correr: 'correr', pular: 'pular',
    jogar: 'jogar', cantar: 'cantar', dançar: 'dançar', nadar: 'nadar',
    olhar: 'olhar', ouvir: 'ouvir', comprar: 'comprar',
    cozinhar: 'cozinhar', limpar: 'limpar', trabalhar: 'trabalhar',
    estudar: 'estudar', aprender: 'aprender', ensinar: 'ensinar',
    abrir: 'abrir', fechar: 'fechar',

    grande: 'grande', pequeno: 'pequeno', alto: 'alto', baixo: 'baixo',
    bonito: 'bonito', feio: 'feio',
    vermelho: 'vermelho', azul: 'azul', amarelo: 'amarelo',
    verde: 'verde', preto: 'preto', branco: 'branco',
    bom: 'bom', mau: 'mau',
    olá: 'olá', obrigado: 'obrigado', adeus: 'tchau',
  },

  // --- DEUTSCH ---
  de: {
    perro: 'Hund', gato: 'Katze', pájaro: 'Vogel', pez: 'Fisch',
    caballo: 'Pferd', vaca: 'Kuh', toro: 'Stier', oveja: 'Schaf',
    cerdo: 'Schwein', conejo: 'Kaninchen', ratón: 'Maus',
    elefante: 'Elefant', león: 'Löwe', tigre: 'Tiger', oso: 'Bär',
    lobo: 'Wolf', zorro: 'Fuchs', mono: 'Affe', serpiente: 'Schlange',
    tortuga: 'Schildkröte', rana: 'Frosch', ballena: 'Wal',
    delfín: 'Delfin', mariposa: 'Schmetterling', abeja: 'Biene',
    hormiga: 'Ameise', araña: 'Spinne', búho: 'Eule',
    loro: 'Papagei', pato: 'Ente', gallina: 'Huhn', gallo: 'Hahn',
    pingüino: 'Pinguin', jirafa: 'Giraffe', cebra: 'Zebra',
    cabra: 'Ziege', hámster: 'Hamster',

    agua: 'Wasser', pan: 'Brot', leche: 'Milch', fruta: 'Obst',
    manzana: 'Apfel', naranja: 'Orange', plátano: 'Banane', uva: 'Traube',
    fresa: 'Erdbeere', tomate: 'Tomate', lechuga: 'Salat',
    zanahoria: 'Karotte', patata: 'Kartoffel', cebolla: 'Zwiebel',
    arroz: 'Reis', huevo: 'Ei', queso: 'Käse', carne: 'Fleisch',
    pollo: 'Hähnchen', pescado: 'Fisch', sopa: 'Suppe',
    galleta: 'Keks', pastel: 'Kuchen', chocolate: 'Schokolade',
    helado: 'Eis', miel: 'Honig', mantequilla: 'Butter',

    casa: 'Haus', puerta: 'Tür', ventana: 'Fenster', cocina: 'Küche',
    dormitorio: 'Schlafzimmer', cama: 'Bett', mesa: 'Tisch',
    silla: 'Stuhl', armario: 'Schrank', nevera: 'Kühlschrank',
    llave: 'Schlüssel',

    son: 'Sonne', mond: 'Mond', stern: 'Stern', himmel: 'Himmel',
    wolke: 'Wolke', regen: 'Regen', schnee: 'Schnee', wind: 'Wind',
    berg: 'Berg', fluss: 'Fluss', see: 'See', meer: 'Meer',
    wald: 'Wald', baum: 'Baum', blume: 'Blume', pflanze: 'Pflanze',
    stadt: 'Stadt', straße: 'Straße', park: 'Park',
    schule: 'Schule', buch: 'Buch', lehrer: 'Lehrer', schüler: 'Schüler',

    kopf: 'Kopf', auge: 'Auge', nase: 'Nase', mund: 'Mund',
    ohr: 'Ohr', hand: 'Hand', fuß: 'Fuß', arm: 'Arm', bein: 'Bein',

    glücklich: 'glücklich', traurig: 'traurig', liebe: 'Liebe',
    angst: 'Angst', mutter: 'Mutter', vater: 'Vater', sohn: 'Sohn',
    tochter: 'Tochter', bruder: 'Bruder', schwester: 'Schwester',

    arzt: 'Arzt', polizist: 'Polizist', feuerwehrmann: 'Feuerwehrmann',
    hemd: 'Hemd', hose: 'Hose', schuhe: 'Schuhe', kleid: 'Kleid',
    jacke: 'Jacke', mantel: 'Mantel', hut: 'Hut',

    computer: 'Computer', telefon: 'Telefon', handy: 'Handy',
    fernseher: 'Fernseher', internet: 'Internet',

    auto: 'Auto', lastwagen: 'Lastwagen', zug: 'Zug', flugzeug: 'Flugzeug',
    schiff: 'Schiff', fahrrad: 'Fahrrad', motorrad: 'Motorrad',
    bus: 'Bus', straßenbahn: 'Straßenbahn', taxi: 'Taxi',

    essen: 'essen', trinken: 'trinken', schlafen: 'schlafen',
    lesen: 'lesen', schreiben: 'schreiben', sprechen: 'sprechen',
    rennen: 'rennen', springen: 'springen', spielen: 'spielen',
    singen: 'singen', tanzen: 'tanzen', schwimmen: 'schwimmen',
    schauen: 'schauen', hören: 'hören', kaufen: 'kaufen',
    kochen: 'kochen', putzen: 'putzen', arbeiten: 'arbeiten',
    lernen: 'lernen', öffnen: 'öffnen', schließen: 'schließen',

    groß: 'groß', klein: 'klein', groß: 'groß', niedrig: 'niedrig',
    schön: 'schön', hässlich: 'hässlich',
    rot: 'rot', blau: 'blau', gelb: 'gelb', grün: 'grün',
    schwarz: 'schwarz', weiß: 'weiß',
    gut: 'gut', schlecht: 'schlecht',
    hallo: 'hallo', danke: 'danke', tschüss: 'tschüss',
  },

  // --- CATALÀ ---
  ca: {
    perro: 'gos', gato: 'gat', pájaro: 'ocell', pez: 'peix',
    caballo: 'cavall', vaca: 'vaca', toro: 'toro', oveja: 'ovella',
    cerdo: 'porc', conejo: 'conill', ratón: 'ratolí', elefante: 'elefant',
    león: 'lleó', tigre: 'tigre', oso: 'ós', lobo: 'llop',
    zorro: 'guineu', mono: 'mico', serpiente: 'serp', tortuga: 'tortuga',
    rana: 'granota', cocodrilo: 'cocodril', ballena: 'balena',
    delfín: 'dofí', tiburón: 'tauró', mariposa: 'papallona',
    abeja: 'abella', hormiga: 'formiga', aranya: 'aranya',
    mosquito: 'mosquit', cucaracha: 'panerola',
    águila: 'àguila', búho: 'mussol', loro: 'lloro', pato: 'ànec',
    gallina: 'gallina', gallo: 'gall', pollito: 'pollastre',
    pingüino: 'pingüí', camello: 'camell', jirafa: 'girafa',
    cebra: 'cebra', hipopótamo: 'hipopòtam', panda: 'panda',
    ardilla: 'esquirol', erizo: 'eriçó', cabra: 'cabra', burro: 'ase',
    hámster: 'hàmster',

    agua: 'aigua', pan: 'pa', leche: 'llet', fruta: 'fruita',
    manzana: 'poma', naranja: 'taronja', plátano: 'plàtan', uva: 'raïm',
    fresa: 'maduixa', tomate: 'tomàquet', lechuga: 'enciam',
    zanahoria: 'pastanaga', patata: 'patata', cebolla: 'ceba',
    arroz: 'arròs', huevo: 'ou', queso: 'formatge', carne: 'carn',
    pollo: 'pollastre', pescado: 'peix', sopa: 'sopa',
    galleta: 'galeta', pastel: 'pastís', chocolate: 'xocolata',
    helado: 'gelat', miel: 'mel', mantequilla: 'mantega',

    casa: 'casa', puerta: 'porta', ventana: 'finestra', cocina: 'cuina',
    dormitorio: 'dormitori', cama: 'llit', mesa: 'taula',
    silla: 'cadira', armario: 'armari', nevera: 'nevera',
    llave: 'clau', escalera: 'escala',

    sol: 'sol', lluna: 'lluna', estrella: 'estrella', cel: 'cel',
    núvol: 'núvol', pluja: 'pluja', neu: 'neu', vent: 'vent',
    muntanya: 'muntanya', riu: 'riu', llac: 'llac', mar: 'mar',
    bosc: 'bosc', arbre: 'arbre', flor: 'flor',

    ciutat: 'ciutat', carrer: 'carrer', parc: 'parc', botiga: 'botiga',
    escola: 'escola', llibre: 'llibre', professor: 'professor',
    alumne: 'alumne', pissarra: 'pissarra',

    cap: 'cap', ull: 'ull', nas: 'nas', boca: 'boca',
    orella: 'orella', mà: 'mà', peu: 'peu', braç: 'braç',
    cama: 'cama',

    feliç: 'feliç', trist: 'trist', amor: 'amor', por: 'por',
    mare: 'mare', pare: 'pare', fill: 'fill', filla: 'filla',
    germà: 'germà', germana: 'germana',

    metge: 'metge', policia: 'policia', bomber: 'bomber',
    camisa: 'camisa', pantaló: 'pantaló', sabates: 'sabates',
    vestit: 'vestit', jaqueta: 'jaqueta', abric: 'abric',

    ordinador: 'ordinador', telèfon: 'telèfon', mòbil: 'mòbil',
    televisió: 'televisió', internet: 'internet',

    cotxe: 'cotxe', camió: 'camió', tren: 'tren', avió: 'avió',
    vaixell: 'vaixell', bicicleta: 'bicicleta', moto: 'moto',
    autobús: 'autobús', metro: 'metro', taxi: 'taxi',

    menjar: 'menjar', beure: 'beure', dormir: 'dormir', llegir: 'llegir',
    escriure: 'escriure', parlar: 'parlar', córrer: 'córrer',
    saltar: 'saltar', jugar: 'jugar', cantar: 'cantar', ballar: 'ballar',
    nedar: 'nedar', mirar: 'mirar', escoltar: 'escoltar',
    comprar: 'comprar', cuinar: 'cuinar', netejar: 'netejar',
    treballar: 'treballar', estudiar: 'estudiar', aprendre: 'aprendre',
    ensenyar: 'ensenyar', obrir: 'obrir', tancar: 'tancar',

    gran: 'gran', petit: 'petit', alt: 'alt', baix: 'baix',
    bonic: 'bonic', lleig: 'lleig',
    vermell: 'vermell', blau: 'blau', groc: 'groc', verd: 'verd',
    negre: 'negre', blanc: 'blanc',
    bo: 'bo', dolent: 'dolent',
    hola: 'hola', gràcies: 'gràcies', adéu: 'adéu',
  },

  // --- VALENCIÀ ---
  va: {
    perro: 'gos', gato: 'gat', pájaro: 'au', pez: 'peix',
    caballo: 'cavall', vaca: 'vaca', toro: 'toro', oveja: 'ovella',
    cerdo: 'porc', conejo: 'conill', ratón: 'ratolí', elefante: 'elefant',
    león: 'lleó', tigre: 'tigre', oso: 'ós', lobo: 'llop',
    zorro: 'raposa', mono: 'mico', serpiente: 'serp', tortuga: 'tortuga',
    rana: 'granota', ballena: 'balena', delfín: 'dofí', mariposa: 'papallona',
    abeja: 'abella', hormiga: 'formiga', araña: 'aranya',
    pato: 'ànec', gallina: 'gallina', gallo: 'gall',
    pingüino: 'pingüí', jirafa: 'girafa', cebra: 'cebra',
    ardilla: 'esquirol',

    agua: 'aigua', pan: 'pa', leche: 'llet', fruta: 'fruita',
    manzana: 'poma', naranja: 'taronja', plátano: 'plàtan', uva: 'raïm',
    fresa: 'maduixa', tomate: 'tomata', lechuga: 'encisam',
    zanahoria: 'pastanaga', patata: 'creïlla', arroz: 'arròs',
    huevo: 'ou', queso: 'formatge', carne: 'carn', pollo: 'pollastre',
    pescado: 'peix', sopa: 'sopa', galleta: 'galeta', pastel: 'pastís',
    chocolate: 'xocolate', helado: 'gelat', miel: 'mel',

    casa: 'casa', puerta: 'porta', ventana: 'finestra', cocina: 'cuina',
    dormitorio: 'dormitori', cama: 'llit', mesa: 'taula',
    silla: 'cadira', armario: 'armari', nevera: 'nevera',
    llave: 'clau', escala: 'escala',

    sol: 'sol', lluna: 'lluna', estrella: 'estrella', cel: 'cel',
    núvol: 'núvol', pluja: 'pluja', neu: 'neu', vent: 'vent',
    muntanya: 'muntanya', riu: 'riu', mar: 'mar',
    bosc: 'bosc', arbre: 'arbre', flor: 'flor',

    ciutat: 'ciutat', carrer: 'carrer', parc: 'parc',
    escola: 'escola', llibre: 'llibre', professor: 'professor',
    alumne: 'alumne',

    cap: 'cap', ull: 'ull', nas: 'nas', boca: 'boca',
    orella: 'orella', mà: 'mà', peu: 'peu', braç: 'braç',
    cama: 'cama',

    feliç: 'feliç', trist: 'trist', amor: 'amor', por: 'por',
    mare: 'mare', pare: 'pare', fill: 'fill', filla: 'filla',
    germà: 'germà', germana: 'germana',

    cotxe: 'cotxe', tren: 'tren', avió: 'avió', bici: 'bici',
    autobús: 'autobús', metro: 'metro', taxi: 'taxi',

    menjar: 'menjar', beure: 'beure', dormir: 'dormir', llegir: 'llegir',
    escriure: 'escriure', parlar: 'parlar', córrer: 'córrer',
    saltar: 'saltar', jugar: 'jugar', cantar: 'cantar', ballar: 'ballar',
    nedar: 'nedar', comprar: 'comprar', cuinar: 'cuinar',
    obrir: 'obrir', tancar: 'tancar',

    gran: 'gran', petit: 'petit', alt: 'alt', baix: 'baix',
    roig: 'roig', blau: 'blau', groc: 'groc', verd: 'verd',
    negre: 'negre', blanc: 'blanc',
    hola: 'hola', gràcies: 'gràcies', adéu: 'adéu',
  },

  // --- GALEGO ---
  gl: {
    perro: 'can', gato: 'gato', pájaro: 'paxaro', pez: 'peixe',
    caballo: 'cabalo', vaca: 'vaca', toro: 'touro', oveja: 'ovella',
    cerdo: 'porco', conejo: 'coello', ratón: 'rato', elefante: 'elefante',
    león: 'león', tigre: 'tigre', oso: 'oso', lobo: 'lobo',
    zorro: 'raposo', mono: 'mono', serpiente: 'serpe', tortuga: 'tartaruga',
    rana: 'ra', ballena: 'balea', delfín: 'golfiño', mariposa: 'bolboreta',
    abeja: 'abella', hormiga: 'formiga', araña: 'araña',
    pato: 'pato', gallina: 'galiña', gallo: 'galo',
    pingüino: 'pingüín', jirafa: 'xirafa', cebra: 'cebra',
    ardilla: 'esquío',

    auga: 'auga', pan: 'pan', leche: 'leite', fruta: 'froita',
    mazá: 'mazá', laranxa: 'laranxa', plátano: 'plátano',
    uva: 'uva', fresa: 'amorodo', tomate: 'tomate',
    leituga: 'leituga', cenoria: 'cenoria', pataca: 'pataca',
    arroz: 'arroz', ovo: 'ovo', queixo: 'queixo', carne: 'carne',
    polo: 'polo', peixe: 'peixe', sopa: 'sopa',
    galleta: 'galleta', pastel: 'pastel', chocolate: 'chocolate',
    xeado: 'xeado', mel: 'mel', manteiga: 'manteiga',

    casa: 'casa', porta: 'porta', fiestra: 'fiestra', cociña: 'cociña',
    dormitorio: 'dormitorio', cama: 'cama', mesa: 'mesa',
    cadeira: 'cadeira', armario: 'armario', neveira: 'neveira',
    chave: 'chave', escaleira: 'escaleira',

    sol: 'sol', lúa: 'lúa', estrela: 'estrela', ceo: 'ceo',
    nube: 'nube', choiva: 'choiva', neve: 'neve', vento: 'vento',
    montaña: 'montaña', río: 'río', lago: 'lago', mar: 'mar',
    bosque: 'bosque', árbore: 'árbore', flor: 'flor',

    cidade: 'cidade', rúa: 'rúa', parque: 'parque', tenda: 'tenda',
    escola: 'escola', libro: 'libro', profesor: 'profesor',
    alumno: 'alumno',

    cabeza: 'cabeza', ollo: 'ollo', nariz: 'nariz', boca: 'boca',
    orella: 'orella', man: 'man', pé: 'pé', brazo: 'brazo',
    perna: 'perna',

    feliz: 'feliz', triste: 'triste', amor: 'amor', medo: 'medo',
    nai: 'nai', pai: 'pai', fillo: 'fillo', filla: 'filla',
    irmán: 'irmán', irmá: 'irmá',

    coche: 'coche', tren: 'tren', avión: 'avión', bici: 'bici',
    autobús: 'autobús', taxi: 'taxi',

    xantar: 'xantar', beber: 'beber', durmir: 'durmir', ler: 'ler',
    escribir: 'escribir', falar: 'falar', correr: 'correr',
    saltar: 'saltar', xogar: 'xogar', cantar: 'cantar', bailar: 'bailar',
    nadar: 'nadar', mercar: 'mercar', cociñar: 'cociñar',
    limpar: 'limpar', traballar: 'traballar', estudar: 'estudar',
    aprender: 'aprender', ensinar: 'ensinar',
    abrir: 'abrir', pechar: 'pechar',

    grande: 'grande', pequeno: 'pequeno', alto: 'alto', baixo: 'baixo',
    bonito: 'bonito', feo: 'feo',
    vermello: 'vermello', azul: 'azul', amarelo: 'amarelo',
    verde: 'verde', negro: 'negro', branco: 'branco',
    bo: 'bo', malo: 'malo',
    ola: 'ola', grazas: 'grazas', adeus: 'adeus',
  },

  // --- EUSKERA ---
  eu: {
    perro: 'txakur', gato: 'katu', pájaro: 'txori', pez: 'arrain',
    caballo: 'zaldi', vaca: 'behi', toro: 'zezen', oveja: 'ardi',
    cerdo: 'txerri', conejo: 'untxi', ratón: 'sagu', elefante: 'elefante',
    león: 'lehoi', tigre: 'tigre', oso: 'hartz', lobo: 'otso',
    zorro: 'azeri', mono: 'tximino', serpiente: 'suge', tortuga: 'dortoka',
    rana: 'igel', ballena: 'balea', delfín: 'izurde', mariposa: 'tximeleta',
    abeja: 'erle', hormiga: 'inurri', araña: 'armiarma',
    pato: 'ahate', gallina: 'oilasko', gallo: 'oilar',
    pingüino: 'pinguino', jirafa: 'jirafa', cebra: 'zebra',
    ardilla: 'urtxintxa',

    ur: 'ur', ogi: 'ogi', esne: 'esne', fruta: 'fruta',
    sagar: 'sagar', laranja: 'laranja', platano: 'plátano',
    mahats: 'mahats', marrubi: 'marrubi', tomate: 'tomate',
    letxuga: 'letxuga', azenario: 'azenario', patata: 'patata',
    arroz: 'arroz', arrautza: 'arrautza', gazta: 'gazta',
    haragi: 'haragi', oilasko: 'oilasko', arrain: 'arrain',
    zopa: 'zopa', galleta: 'galleta', pastel: 'pastel',
    txokolate: 'txokolate', izozki: 'izozki', ezti: 'ezti',
    gurin: 'gurin',

    etxe: 'etxe', ate: 'ate', leiho: 'leiho', sukalde: 'sukalde',
    logela: 'logela', ohe: 'ohe', mahai: 'mahai', aulki: 'aulki',
    armairu: 'armairu', hozkailu: 'hozkailu', gako: 'gako',
    eskailera: 'eskailera',

    eguzki: 'eguzki', ilargi: 'ilargi', izar: 'izar', zeru: 'zeru',
    hodei: 'hodei', euri: 'euri', elur: 'elur', haize: 'haize',
    mendi: 'mendi', ibai: 'ibai', laku: 'laku', itsaso: 'itsaso',
    baso: 'baso', zuhaitz: 'zuhaitz', lore: 'lore',

    hiri: 'hiri', kale: 'kale', parke: 'parke', denda: 'denda',
    eskola: 'eskola', liburu: 'liburu', irakasle: 'irakasle',
    ikasle: 'ikasle',

    buru: 'buru', begi: 'begi', sudur: 'sudur', aho: 'aho',
    belarri: 'belarri', esku: 'esku', oin: 'oin', beso: 'beso',
    hanka: 'hanka',

    zoriontsu: 'zoriontsu', triste: 'triste', maitasun: 'maitasun',
    beldur: 'beldur', ama: 'ama', aita: 'aita', seme: 'seme',
    alaba: 'alaba', anaia: 'anaia', arreba: 'arreba',

    kotxe: 'kotxe', tren: 'tren', hegazkin: 'hegazkin', bizi: 'bizi',
    autobus: 'autobus', taxi: 'taxi',

    jan: 'jan', edan: 'edan', lo_egin: 'lo_egin', irakurri: 'irakurri',
    idatzi: 'idatzi', hitz_egin: 'hitz_egin', korrika_egin: 'korrika_egin',
    jauzi_egin: 'jauzi_egin', jolastu: 'jolastu', abestu: 'abestu',
    dantza_egin: 'dantza_egin', igeri_egin: 'igeri_egin',
    erosi: 'erosi', sukaldatu: 'sukaldatu', garbitu: 'garbitu',
    lan_egin: 'lan_egin', ikasi: 'ikasi',
    ireki: 'ireki', itxi: 'itxi',

    handi: 'handi', txiki: 'txiki', altu: 'altu', baxu: 'baxu',
    eder: 'eder', itsusi: 'itsusi',
    gorri: 'gorri', urdin: 'urdin', hori: 'hori', berde: 'berde',
    beltz: 'beltz', zuri: 'zuri',
    on: 'on', txar: 'txar',
    kaixo: 'kaixo', eskerrik_asko: 'eskerrik_asko', agur: 'agur',
  }
}

// ============================================================
// PROCESAR ARCHIVOS
// ============================================================

function processFile(filePath, lang) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const trans = TRANSLATIONS[lang]
  if (!trans) { console.log(`  ✗ Sin traducciones para ${lang}`); return false }

  let changed = false
  const newLines = lines.map(line => {
    const match = line.match(/^(\s+)(\w[\w_]*)(:\s*\{.*)$/)
    if (match) {
      const indent = match[1]
      const spanishWord = match[2]
      const rest = match[3]
      if (trans[spanishWord]) {
        changed = true
        return `${indent}${trans[spanishWord]}${rest}`
      }
    }
    return line
  })

  if (changed) {
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8')
    return true
  }
  return false
}

const LANGUAGES = ['en', 'fr', 'pt', 'de', 'ca', 'va', 'gl', 'eu']
let totalFiles = 0
let totalChanged = 0

for (const lang of LANGUAGES) {
  const files = fs.readdirSync(DATA_DIR)
    .filter(f => f.startsWith('pictogram-') && f.endsWith(`-${lang}.js`))
    .sort()

  for (const file of files) {
    const filePath = path.join(DATA_DIR, file)
    const changed = processFile(filePath, lang)
    totalFiles++
    if (changed) {
      totalChanged++
      console.log(`✓ ${file}`)
    } else {
      console.log(`  ${file} (sin cambios)`)
    }
  }
}

console.log(`\n✓ Procesados ${totalFiles} archivos, modificados ${totalChanged}`)
