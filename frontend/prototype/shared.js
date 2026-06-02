// ============================================================
// FaroPet — Shared Utilities
// ============================================================

var BRAND = {
  orange:     '#F97316',
  orangeDark: '#EA580C',
  brown:      '#451a03',
  brownMid:   '#7C3505',
  beige:      '#FEF3C7',
  bg:         '#F4F4F0',
  green:      '#16A34A',
  red:        '#DC2626',
  amber:      '#D97706',
};

// ---- Brazilian States ----
var BR_STATES = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];
var BR_STATE_NAMES = {
  AC:'Acre', AL:'Alagoas', AP:'Amapá', AM:'Amazonas', BA:'Bahia', CE:'Ceará',
  DF:'Distrito Federal', ES:'Espírito Santo', GO:'Goiás', MA:'Maranhão',
  MT:'Mato Grosso', MS:'Mato Grosso do Sul', MG:'Minas Gerais', PA:'Pará',
  PB:'Paraíba', PR:'Paraná', PE:'Pernambuco', PI:'Piauí', RJ:'Rio de Janeiro',
  RN:'Rio Grande do Norte', RS:'Rio Grande do Sul', RO:'Rondônia', RR:'Roraima',
  SC:'Santa Catarina', SP:'São Paulo', SE:'Sergipe', TO:'Tocantins',
};

// ---- Demo clinic data ----
var DEMO_CLINICS = [
  { id: 'c1', name: 'Clínica VetViva',     address: 'Rua das Flores, 123 – Jardim Europa', distance: '0,8 km', image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=400&q=70', phone: '(11) 3456-7890' },
  { id: 'c2', name: 'Pet Saúde Center',    address: 'Av. Brasil, 450 – Centro',             distance: '1,2 km', image: 'https://images.unsplash.com/photo-1629909615957-be38d48fbbe4?auto=format&fit=crop&w=400&q=70', phone: '(11) 2345-6789' },
  { id: 'c3', name: 'Animal Plus',         address: 'R. Pedro Álvares, 88 – Vila Nova',     distance: '2,1 km', image: 'https://images.unsplash.com/photo-1560743173-567a3b5658b1?auto=format&fit=crop&w=400&q=70', phone: '(11) 4567-8901' },
  { id: 'c4', name: 'VetCare Premium',     address: 'Av. Paulista, 1200 – Bela Vista',      distance: '3,4 km', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=400&q=70', phone: '(11) 9876-5432' },
  { id: 'c5', name: 'Clínica BioPet',      address: 'Rua Augusta, 550 – Consolação',        distance: '4,0 km', image: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?auto=format&fit=crop&w=400&q=70', phone: '(11) 3333-2222' },
];

// ---- Demo adoption data (always shown, not saved to localStorage) ----
var DEMO_ADOPTIONS = [
  {
    id: 'demo-1', name: 'Mel', species: 'Cachorro', breed: 'SRD', age: '2 anos', size: 'Médio',
    gender: 'Fêmea', city: 'Cuiabá', state: 'MT',
    description: 'Muito carinhosa, dócil e acostumada com crianças. Adora brincar e é ótima companhia para toda a família.',
    healthInfo: 'Vacinada, vermifugada e saudável.',
    contactPhone: '(65) 99999-0001', contactName: 'Voluntário Faro',
    photos: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=400&q=70'],
  },
  {
    id: 'demo-2', name: 'Theo', species: 'Gato', breed: 'SRD', age: '1 ano', size: 'Pequeno',
    gender: 'Macho', city: 'Várzea Grande', state: 'MT',
    description: 'Gato tranquilo, castrado e muito companheiro. Se adapta bem a apartamentos e casas.',
    healthInfo: 'Castrado, vacinado e saudável.',
    contactPhone: '(65) 99999-0002', contactName: 'Voluntário Faro',
    photos: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=70'],
  },
  {
    id: 'demo-3', name: 'Luna', species: 'Cachorro', breed: 'Pinscher', age: '3 anos', size: 'Pequeno',
    gender: 'Fêmea', city: 'Chapada dos Guimarães', state: 'MT',
    description: 'Pequena, ativa e ideal para apartamento. Muito inteligente e fácil de treinar.',
    healthInfo: 'Vacinada e vermifugada.',
    contactPhone: '(65) 99999-0003', contactName: 'Voluntário Faro',
    photos: ['https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=400&q=70'],
  },
  {
    id: 'demo-4', name: 'Bob', species: 'Cachorro', breed: 'Labrador', age: '4 anos', size: 'Grande',
    gender: 'Macho', city: 'Cuiabá', state: 'MT',
    description: 'Muito brincalhão, vacinado e sociável. Adora crianças e outros animais.',
    healthInfo: 'Vacinado, vermifugado e castrado.',
    contactPhone: '(65) 99999-0004', contactName: 'Voluntário Faro',
    photos: ['https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=70'],
  },
];

// ============================================================
// VACCINE RULES DATABASE
// ============================================================
var VACCINE_DB = {
  Cachorro: [
    { id: 'v8',         name: 'V8 (Polivalente)',             totalDoses: 3, intervals: [30, 30], boosterDays: 365, description: 'Cinomose, Parvovírus, Hepatite, Coronavírus e outras' },
    { id: 'v10',        name: 'V10 (Polivalente)',            totalDoses: 3, intervals: [30, 30], boosterDays: 365, description: 'Proteção ampla contra 10 doenças' },
    { id: 'antirab',    name: 'Antirrábica',                  totalDoses: 1, boosterDays: 365,   description: 'Raiva canina — obrigatória por lei' },
    { id: 'lepto',      name: 'Leptospirose',                 totalDoses: 2, intervals: [30],    boosterDays: 365, description: 'Leptospirose canina' },
    { id: 'leishmania', name: 'Leishmaniose',                 totalDoses: 3, intervals: [21, 21], boosterDays: 365, description: 'Leishmaniose visceral canina' },
    { id: 'bordetella', name: 'Bordetella (Tosse dos Canis)', totalDoses: 1, boosterDays: 365,   description: 'Traqueobronquite infecciosa canina' },
    { id: 'giardia',    name: 'Giardia',                      totalDoses: 2, intervals: [21],    boosterDays: 365, description: 'Giardíase canina' },
    { id: 'gripe-c',    name: 'Gripe Canina (Influenza)',     totalDoses: 2, intervals: [21],    boosterDays: 365, description: 'Influenza canina' },
  ],
  Gato: [
    { id: 'triple-f',   name: 'Tríplice Felina (FVRCP)',      totalDoses: 3, intervals: [30, 30], boosterDays: 365, description: 'Rinotraqueíte, Calicivírus e Panleucopenia' },
    { id: 'antirab-f',  name: 'Antirrábica',                  totalDoses: 1, boosterDays: 365,   description: 'Raiva felina' },
    { id: 'felv',       name: 'FeLV (Leucemia Felina)',       totalDoses: 2, intervals: [30],    boosterDays: 365, description: 'Leucemia Felina Viral' },
    { id: 'fiv-felv',   name: 'FIV/FeLV',                    totalDoses: 3, intervals: [21, 21], boosterDays: 365, description: 'Imunodeficiência e Leucemia Felina' },
    { id: 'clamido',    name: 'Clamidiose Felina',            totalDoses: 2, intervals: [30],    boosterDays: 365, description: 'Infecção por Chlamydophila felis' },
  ],
  Coelho: [
    { id: 'vhd',  name: 'Doença Hemorrágica Viral (VHD)', totalDoses: 1, boosterDays: 365, description: 'Doença hemorrágica viral do coelho' },
    { id: 'mixo', name: 'Mixomatose',                     totalDoses: 1, boosterDays: 365, description: 'Mixomatose do coelho' },
  ],
  Pássaro: [],
  Outro: [],
};

// ============================================================
// STORAGE — Pets
// ============================================================
function getFaroPets() {
  return JSON.parse(localStorage.getItem('faro_pets') || '[]');
}
function saveFaroPets(pets) {
  localStorage.setItem('faro_pets', JSON.stringify(pets));
}
function getFaroPetById(id) {
  return getFaroPets().find(function(p) { return p.id === id; }) || null;
}
function updateFaroPet(updatedPet) {
  var pets = getFaroPets();
  var idx = pets.findIndex(function(p) { return p.id === updatedPet.id; });
  if (idx !== -1) { pets[idx] = updatedPet; saveFaroPets(pets); }
}
function deleteFaroPetById(id) {
  var meds = getFaroMedicines().filter(function(m) { return m.petId !== id; });
  saveFaroMedicines(meds);
  saveFaroPets(getFaroPets().filter(function(p) { return p.id !== id; }));
}

// ============================================================
// STORAGE — User
// ============================================================
function getFaroUser() {
  return JSON.parse(localStorage.getItem('faro_user') || 'null');
}
function saveFaroUser(user) {
  localStorage.setItem('faro_user', JSON.stringify(user));
}
function clearFaroUser() {
  localStorage.removeItem('faro_user');
}

// ============================================================
// STORAGE — Notifications
// ============================================================
function getFaroNotifications() {
  return JSON.parse(localStorage.getItem('faro_notifications') || '[]');
}
function saveFaroNotifications(notifs) {
  localStorage.setItem('faro_notifications', JSON.stringify(notifs));
}

// ============================================================
// STORAGE — Medicines
// ============================================================
function getFaroMedicines() {
  return JSON.parse(localStorage.getItem('faro_medicines') || '[]');
}
function saveFaroMedicines(meds) {
  localStorage.setItem('faro_medicines', JSON.stringify(meds));
}

// ============================================================
// STORAGE — Adoptions
// ============================================================
function getFaroAdoptions() {
  var stored = JSON.parse(localStorage.getItem('faro_adoptions') || '[]');
  return DEMO_ADOPTIONS.concat(stored);
}
function saveFaroAdoptions(adoptions) {
  localStorage.setItem('faro_adoptions', JSON.stringify(adoptions));
}
function getFaroAdoptionById(id) {
  return getFaroAdoptions().find(function(a) { return a.id === id; }) || null;
}

// ============================================================
// AUTH
// ============================================================
function requireAuth() {
  if (!getFaroUser()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// ============================================================
// UTILITIES
// ============================================================
function escapeHtml(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function formatDate(d) {
  if (!d) return '—';
  var dt = new Date(d + 'T00:00:00');
  if (isNaN(dt.getTime())) return String(d);
  return dt.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatDateShort(d) {
  if (!d) return '—';
  var dt = new Date(d + 'T00:00:00');
  if (isNaN(dt.getTime())) return String(d);
  return dt.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

function getUserFirstName() {
  var user = getFaroUser();
  if (!user || !user.name) return 'Tutor';
  return user.name.split(' ')[0];
}

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function addDays(dateStr, days) {
  var d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

// Build a state options HTML string for a <select>
function buildStateOptions(selected) {
  return BR_STATES.map(function(s) {
    return '<option value="' + s + '"' + (s === selected ? ' selected' : '') + '>' + escapeHtml(BR_STATE_NAMES[s] || s) + '</option>';
  }).join('');
}

// ============================================================
// VACCINE STATUS HELPERS
// Statuses: completed | scheduled | pending | overdue | next-dose
// ============================================================
function vaccineStatusLabel(s) {
  return {
    completed:   'Tomada',
    scheduled:   'Agendada',
    pending:     'Não agendada',
    overdue:     'Atrasada',
    'next-dose': 'Próxima dose',
  }[s] || (s || '—');
}

function vaccineStatusColors(s) {
  return {
    completed:   { text: '#6B7280', bg: '#F3F4F6', bar: '#9CA3AF' },
    scheduled:   { text: '#16A34A', bg: '#DCFCE7', bar: '#16A34A' },
    pending:     { text: '#EA580C', bg: '#FFF7ED', bar: '#EA580C' },
    overdue:     { text: '#DC2626', bg: '#FEE2E2', bar: '#DC2626' },
    'next-dose': { text: '#D97706', bg: '#FEF3C7', bar: '#D97706' },
  }[s] || { text: '#EA580C', bg: '#FFF7ED', bar: '#EA580C' };
}

function buildStatusBadge(status) {
  var label = vaccineStatusLabel(status);
  var c = vaccineStatusColors(status);
  return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold" style="color:' + c.text + ';background:' + c.bg + ';">' + escapeHtml(label) + '</span>';
}

// ============================================================
// AUTO-DOSE GENERATION
// ============================================================
function getVaccineRule(species, ruleId) {
  return (VACCINE_DB[species] || []).find(function(r) { return r.id === ruleId; }) || null;
}

function generateNextDose(pet, completedVaccine) {
  if (!completedVaccine.vaccineRuleId) return null;
  var rule = getVaccineRule(pet.species, completedVaccine.vaccineRuleId);
  if (!rule) return null;

  var doseNum  = completedVaccine.doseNumber || 1;
  var doneDate = completedVaccine.date;

  if (doseNum < rule.totalDoses) {
    var intervalDays = (rule.intervals && rule.intervals[doseNum - 1]) || null;
    var nextSched    = (intervalDays && doneDate) ? addDays(doneDate, intervalDays) : null;
    return {
      id:             String(Date.now()) + '_d' + (doseNum + 1),
      name:           rule.name,
      vaccineRuleId:  rule.id,
      doseNumber:     doseNum + 1,
      totalDoses:     rule.totalDoses,
      date:           null,
      scheduledDate:  nextSched,
      status:         nextSched ? 'scheduled' : 'pending',
      notes:          'Dose ' + (doseNum + 1) + ' de ' + rule.totalDoses + ' — gerada automaticamente.',
      autoGenerated:  true,
    };
  }

  if (rule.boosterDays && doneDate) {
    return {
      id:            String(Date.now() + 1) + '_boost',
      name:          rule.name + ' — Reforço anual',
      vaccineRuleId: rule.id,
      doseNumber:    doseNum + 1,
      totalDoses:    null,
      date:          null,
      scheduledDate: addDays(doneDate, rule.boosterDays),
      status:        'pending',
      notes:         'Reforço anual gerado automaticamente.',
      autoGenerated: true,
    };
  }

  return null;
}

// ============================================================
// VACCINE LIST CARD (reusable — vaccines.html, dashboard, pet-profile)
// Card icons use brand neutral style: #FFF7ED bg + #F97316 icon
// Status is shown via colored bar and label text only
// ============================================================
function buildVaccineListCard(vaccine, showPetName) {
  var c        = vaccineStatusColors(vaccine.status);
  var label    = vaccineStatusLabel(vaccine.status);
  var petId    = vaccine.petId || '';
  var href     = 'vaccine-detail.html?id=' + encodeURIComponent(vaccine.id || '') + '&petId=' + encodeURIComponent(petId);
  var doseTag  = (vaccine.doseNumber && vaccine.totalDoses)
    ? ' <span class="text-xs text-gray-400 font-normal ml-1">Dose ' + vaccine.doseNumber + '/' + vaccine.totalDoses + '</span>'
    : '';
  var dateInfo = vaccine.date
    ? formatDate(vaccine.date)
    : (vaccine.scheduledDate ? 'Prevista: ' + formatDate(vaccine.scheduledDate) : '');

  return (
    '<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">' +
      '<div class="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style="background:#FFF7ED;">' +
        '<svg class="w-5 h-5" style="color:#F97316;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>' +
      '</div>' +
      '<div class="flex-1 min-w-0 flex items-center gap-2">' +
        '<div class="w-1 rounded-full flex-shrink-0" style="background:' + c.bar + ';height:2.8rem;"></div>' +
        '<div class="min-w-0 flex-1">' +
          '<p class="font-semibold text-sm text-gray-900 leading-tight truncate">' + escapeHtml(vaccine.name) + doseTag + '</p>' +
          (showPetName && vaccine.petName ? '<p class="text-xs text-gray-400 truncate">' + escapeHtml(vaccine.petName) + '</p>' : '') +
          '<div class="flex items-center gap-2 mt-0.5 flex-wrap">' +
            '<span class="text-xs font-semibold" style="color:' + c.text + ';">' + escapeHtml(label) + '</span>' +
            (dateInfo ? '<span class="text-xs text-gray-400">' + escapeHtml(dateInfo) + '</span>' : '') +
          '</div>' +
        '</div>' +
      '</div>' +
      '<a href="' + href + '" class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style="background:#F97316;" aria-label="Ver detalhes">' +
        '<svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>' +
      '</a>' +
    '</div>'
  );
}

// ============================================================
// ADOPTION CARD (reusable)
// Uses div+onclick to avoid invalid nested <a> elements.
// ============================================================
function buildAdoptionCard(a) {
  var detailHref   = 'adoption-detail.html?id=' + encodeURIComponent(a.id);
  var speciesLabel = escapeHtml(a.species || '');
  var breedLabel   = a.breed ? ' · ' + escapeHtml(a.breed) : '';
  var locationStr  = [a.city, a.state].filter(Boolean).map(escapeHtml).join(' – ');

  var photoHtml = (a.photos && a.photos[0])
    ? '<img src="' + escapeHtml(a.photos[0]) + '" style="width:100%;height:100%;object-fit:cover;display:block;" alt="' + escapeHtml(a.name) + '" loading="lazy">'
    : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#FFF7ED;">' +
        '<img src="img/pawIcon.png" style="width:40px;height:40px;object-fit:contain;opacity:0.35;" alt="" aria-hidden="true">' +
      '</div>';

  var chips =
    (a.age    ? '<span style="font-size:11px;font-weight:500;padding:2px 8px;border-radius:9999px;background:#FFF7ED;color:#EA580C;">' + escapeHtml(a.age)    + '</span>' : '') +
    (a.gender ? '<span style="font-size:11px;font-weight:500;padding:2px 8px;border-radius:9999px;background:#FEF3C7;color:#7C3505;">' + escapeHtml(a.gender) + '</span>' : '') +
    (a.size   ? '<span style="font-size:11px;font-weight:500;padding:2px 8px;border-radius:9999px;background:#F3F4F6;color:#374151;">' + escapeHtml(a.size)   + '</span>' : '');

  var phoneBtn = a.contactPhone
    ? '<a href="tel:' + escapeHtml(a.contactPhone) + '" onclick="event.stopPropagation();" ' +
        'style="flex-shrink:0;width:32px;height:32px;border-radius:9999px;background:#F97316;display:flex;align-items:center;justify-content:center;" ' +
        'title="' + escapeHtml(a.contactPhone) + '">' +
          '<svg style="width:14px;height:14px;color:#fff;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">' +
            '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>' +
          '</svg>' +
      '</a>'
    : '';

  var descHtml = a.description
    ? '<p style="font-size:12px;color:#6B7280;margin-top:8px;line-height:1.5;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">' +
        escapeHtml(a.description) + '</p>'
    : '';

  return (
    '<div onclick="window.location.href=\'' + detailHref + '\'" ' +
      'style="background:#fff;border-radius:16px;box-shadow:0 1px 4px rgba(0,0,0,0.07);border:1px solid #F3F4F6;overflow:hidden;cursor:pointer;transition:box-shadow 0.18s;" ' +
      'onmouseover="this.style.boxShadow=\'0 4px 16px rgba(0,0,0,0.1)\'" ' +
      'onmouseout="this.style.boxShadow=\'0 1px 4px rgba(0,0,0,0.07)\'">' +
      '<div style="width:100%;height:176px;background:#F3F4F6;overflow:hidden;">' + photoHtml + '</div>' +
      '<div style="padding:14px;">' +
        '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;">' +
          '<div style="min-width:0;flex:1;">' +
            '<p style="font-weight:700;font-size:15px;color:#111827;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0;">' + escapeHtml(a.name) + '</p>' +
            '<p style="font-size:12px;color:#9CA3AF;margin:2px 0 0;">' + speciesLabel + breedLabel + '</p>' +
          '</div>' +
          phoneBtn +
        '</div>' +
        (chips ? '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:8px;">' + chips + '</div>' : '') +
        (locationStr
          ? '<p style="font-size:11px;color:#9CA3AF;margin-top:6px;display:flex;align-items:center;gap:3px;">' +
              '<svg style="width:11px;height:11px;flex-shrink:0;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">' +
                '<path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>' +
                '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>' +
              '</svg>' + locationStr +
            '</p>'
          : '') +
        descHtml +
        '<div style="margin-top:12px;padding-top:10px;border-top:1px solid #F9FAFB;">' +
          '<span style="font-size:12px;font-weight:600;color:#F97316;">Ver detalhes →</span>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
}

// ============================================================
// DESKTOP SIDEBAR NAVIGATION
// ============================================================
var SIDEBAR_ITEMS = [
  {
    id: 'home',         href: 'dashboard.html',     label: 'Início',
    fill: true,  vb: '0 0 24 24',
    icon: '<path fill-rule="evenodd" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" clip-rule="evenodd"/>',
  },
  {
    id: 'pets',         href: 'dashboard.html',     label: 'Meus Pets',
    fill: true,  vb: '0 0 24 24',
    icon: '<circle cx="7" cy="4.5" r="2"/><circle cx="17" cy="4.5" r="2"/><circle cx="4" cy="10" r="1.5"/><circle cx="20" cy="10" r="1.5"/><path d="M12 8.5c-3.59 0-6.5 2.46-6.5 6.5 0 2.49 2.01 4.5 4.5 4.5h4c2.49 0 4.5-2.01 4.5-4.5 0-4.04-2.91-6.5-6.5-6.5z"/>',
  },
  {
    id: 'vaccines',     href: 'vaccines.html',       label: 'Vacinas',
    fill: false, vb: '0 0 24 24',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>',
  },
  {
    id: 'wallet',       href: 'vaccine-wallet.html', label: 'Carteira de Vacinas',
    fill: false, vb: '0 0 24 24',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"/>',
  },
  {
    id: 'appointments', href: 'appointments.html',   label: 'Consultas',
    fill: false, vb: '0 0 24 24',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>',
  },
  {
    id: 'medicines',    href: 'medicines.html',       label: 'Medicamentos',
    fill: false, vb: '0 0 24 24',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"/>',
  },
  {
    id: 'clinics',      href: 'clinics.html',         label: 'Clínicas',
    fill: false, vb: '0 0 24 24',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"/>',
  },
  {
    id: 'adoption',     href: 'adoption.html',         label: 'Adoção',
    fill: true,  vb: '0 0 24 24',
    icon: '<circle cx="7" cy="4.5" r="2"/><circle cx="17" cy="4.5" r="2"/><circle cx="4" cy="10" r="1.5"/><circle cx="20" cy="10" r="1.5"/><path d="M12 8.5c-3.59 0-6.5 2.46-6.5 6.5 0 2.49 2.01 4.5 4.5 4.5h4c2.49 0 4.5-2.01 4.5-4.5 0-4.04-2.91-6.5-6.5-6.5z"/>',
  },
  {
    id: 'notifications',href: 'notifications.html',   label: 'Notificações',
    fill: false, vb: '0 0 24 24',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>',
  },
  {
    id: 'profile',      href: 'profile.html',          label: 'Meu Perfil',
    fill: true,  vb: '0 0 24 24',
    icon: '<path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd"/>',
  },
];

function renderDesktopSidebar(activePage) {
  var container = document.getElementById('desktop-sidebar');
  if (!container) return;

  var user      = getFaroUser();
  var userFirst = (user && user.name) ? user.name.split(' ')[0] : 'Tutor';
  var photoUrl  = user && user.photoUrl ? user.photoUrl : null;

  var avatarHtml = photoUrl
    ? '<img src="' + escapeHtml(photoUrl) + '" class="w-9 h-9 rounded-full object-cover flex-shrink-0" alt="Foto de perfil"/>'
    : '<div class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style="background:#F97316;"><svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd"/></svg></div>';

  var itemsHtml = SIDEBAR_ITEMS.map(function(item) {
    var isActive  = item.id === activePage;
    var vb        = item.vb || '0 0 24 24';
    var svgProps  = item.fill
      ? 'fill="currentColor" viewBox="' + vb + '"'
      : 'fill="none" stroke="currentColor" stroke-width="1.8" viewBox="' + vb + '"';
    var cls = 'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ' +
      (isActive ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white');
    var iconHtml = item.id === 'adoption'
      ? '<img src="img/pawIcon.png" class="w-5 h-5 flex-shrink-0 object-contain" style="filter:brightness(0) invert(1);' + (isActive ? '' : 'opacity:0.7;') + '" alt="" aria-hidden="true">'
      : '<svg class="w-5 h-5 flex-shrink-0" ' + svgProps + ' aria-hidden="true">' + item.icon + '</svg>';
    return '<a href="' + item.href + '" class="' + cls + '"' + (isActive ? ' aria-current="page"' : '') + '>' +
      iconHtml +
      '<span class="truncate">' + escapeHtml(item.label) + '</span>' +
      '</a>';
  }).join('');

  container.innerHTML =
    '<aside class="hidden lg:flex lg:flex-col fixed inset-y-0 left-0 w-64 z-50 shadow-xl" style="background:#7C3505;" aria-label="Menu lateral">' +
      '<div class="px-5 py-5 border-b border-white/10 flex-shrink-0">' +
        '<a href="dashboard.html" class="block">' +
          '<img src="img/FaroLogo.png" alt="Faro" style="height:36px;width:auto;filter:brightness(0) invert(1);">' +
        '</a>' +
      '</div>' +
      '<nav class="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">' + itemsHtml + '</nav>' +
      '<div class="px-4 py-4 border-t border-white/10 flex-shrink-0">' +
        '<div class="flex items-center gap-3">' +
          '<a href="profile.html" class="hover:opacity-80 transition-opacity" aria-label="Perfil">' + avatarHtml + '</a>' +
          '<div class="flex-1 min-w-0">' +
            '<a href="profile.html" class="text-white text-sm font-semibold truncate block hover:text-amber-300 transition-colors">' + escapeHtml(userFirst) + '</a>' +
            '<button onclick="if(confirm(\'Deseja sair da conta?\')){clearFaroUser();window.location.href=\'login.html\';}" class="text-amber-300 text-xs hover:text-white transition-colors">Sair da conta</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</aside>';
}

// ============================================================
// BOTTOM NAVIGATION (mobile only)
// Center item = Adoption — always elevated with paw icon
// ============================================================

// Paw SVG path (fill, viewBox 0 0 24 24)
var PAW_ICON = '<circle cx="7" cy="4.5" r="2"/><circle cx="17" cy="4.5" r="2"/><circle cx="4" cy="10" r="1.5"/><circle cx="20" cy="10" r="1.5"/><path d="M12 8.5c-3.59 0-6.5 2.46-6.5 6.5 0 2.49 2.01 4.5 4.5 4.5h4c2.49 0 4.5-2.01 4.5-4.5 0-4.04-2.91-6.5-6.5-6.5z"/>';

var NAV_ITEMS = [
  {
    id: 'home',     href: 'dashboard.html',  label: 'Início',   fill: true,  vb: '0 0 24 24',
    icon: '<path fill-rule="evenodd" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" clip-rule="evenodd"/>',
  },
  {
    id: 'vaccines', href: 'vaccines.html',   label: 'Vacinas',  fill: false, vb: '0 0 24 24',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>',
  },
  {
    id: 'adoption', href: 'adoption.html',   label: 'Adoção',   fill: true,  vb: '0 0 24 24',
    icon: PAW_ICON,
  },
  {
    id: 'clinics',  href: 'clinics.html',    label: 'Clínicas', fill: false, vb: '0 0 24 24',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"/>',
  },
  {
    id: 'menu',     href: 'menu.html',       label: 'Menu',     fill: false, vb: '0 0 24 24',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>',
  },
];

function renderBottomNav(activePage) {
  var container = document.getElementById('bottom-nav');
  if (!container) return;

  var items = NAV_ITEMS.map(function(item, idx) {
    var isActive = item.id === activePage;
    var isCenter = idx === 2;

    var iconHtml;
    if (isCenter) {
      iconHtml = '<img src="img/pawIcon.png" class="w-5 h-5 object-contain" ' +
        'style="filter:brightness(0) invert(1);' + (isActive ? '' : 'opacity:0.75;') + '" alt="" aria-hidden="true">';
    } else {
      var svgProps = item.fill
        ? 'fill="currentColor" viewBox="' + item.vb + '"'
        : 'fill="none" stroke="currentColor" stroke-width="1.8" viewBox="' + item.vb + '"';
      var iconColor = isActive ? 'color:#fff;' : 'color:rgba(255,255,255,0.75);';
      iconHtml = '<svg class="w-5 h-5" style="' + iconColor + '" ' + svgProps + ' aria-hidden="true">' + item.icon + '</svg>';
    }

    var labelStyle = isActive
      ? 'color:#fff;font-weight:600;'
      : 'color:rgba(255,255,255,0.75);font-weight:500;';

    return '<a href="' + item.href + '" class="flex flex-col items-center justify-center gap-0.5 flex-1 py-2" ' +
      'aria-label="' + item.label + '"' + (isActive ? ' aria-current="page"' : '') + '>' +
      iconHtml +
      '<span class="text-[10px] leading-tight" style="' + labelStyle + '">' + escapeHtml(item.label) + '</span>' +
    '</a>';
  }).join('');

  container.innerHTML =
    '<nav class="lg:hidden fixed z-50 flex items-center shadow-xl" ' +
    'style="background:#F97316;border-radius:9999px;max-width:400px;width:calc(100% - 2rem);' +
    'left:50%;transform:translateX(-50%);bottom:1rem;padding:0.375rem 0.5rem;" aria-label="Navegação">' +
    items + '</nav>';
}

// ============================================================
// PAGE HEADER — sticky top bar (legacy helper, still used by some pages)
// ============================================================
function renderPageHeader(title, backHref, actionHtml) {
  var container = document.getElementById('page-header');
  if (!container) return;
  var backBtn = backHref
    ? '<a href="' + backHref + '" class="lg:hidden w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mr-3" aria-label="Voltar"><svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg></a>'
    : '';
  container.innerHTML =
    '<div class="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">' +
      '<div class="flex items-center px-4 lg:px-8 py-4">' +
        backBtn +
        '<h1 class="text-lg lg:text-2xl font-bold text-gray-900 flex-1 truncate">' + escapeHtml(title) + '</h1>' +
        (actionHtml || '') +
      '</div>' +
    '</div>';
}
