[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/vxRx3x_P)

<div align="center">

  <img src="./img/FaroLogo.png" alt="Logo Faro Pet" width="180" />

  <br />

  <img 
    src="https://readme-typing-svg.demolab.com?font=Nunito&weight=700&size=28&duration=3000&pause=900&color=8B5E3C&center=true&vCenter=true&width=700&lines=%F0%9F%90%BE;Sua+carteira+digital+de+sa%C3%BAde+pet;Cuidado%2C+organiza%C3%A7%C3%A3o+e+carinho+em+um+s%C3%B3+lugar" 
    alt="Typing SVG"
  />

  <p>
    <strong>Uma plataforma digital para ajudar tutores a cuidar melhor da saúde dos seus pets.</strong>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Status-Em%20desenvolvimento-F6B17A?style=for-the-badge" />
    <img src="https://img.shields.io/badge/Tipo-PWA-8BC6A9?style=for-the-badge" />
    <img src="https://img.shields.io/badge/Foco-Sa%C3%BAde%20Pet-BE8C63?style=for-the-badge" />
    <img src="https://img.shields.io/badge/Mobile--First-Sim-F7D9A0?style=for-the-badge" />
  </p>

  <br />

  <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="180" alt="Gatinho animado" />

</div>

---

## Estrutura do projeto

```text
FaroPet/
├── frontend/   # Aplicacao web React + Vite
├── backend/    # API NestJS
├── docs/       # Documentacao do projeto
└── package.json
```

Comandos principais a partir da raiz:

```bash
npm run dev:frontend
npm run build:frontend
npm run dev:backend
npm run build:backend
```

Tambem e possivel entrar em `frontend/` ou `backend/` e usar os scripts npm de cada projeto diretamente.

---

## 🐾 Sobre o Faro Pet

O **Faro Pet** é uma aplicação web progressiva criada para centralizar os principais cuidados de saúde dos animais de estimação.

A proposta do projeto é substituir controles espalhados, como carteirinhas físicas, anotações no papel, fotos perdidas no celular e lembretes soltos, por uma plataforma simples, organizada, responsiva e fácil de acessar.

Com o Faro Pet, o tutor consegue acompanhar dados importantes do pet, como:

- vacinas aplicadas;
- próximas doses;
- medicamentos;
- consultas veterinárias;
- sintomas;
- observações;
- anexos e comprovantes;
- lembretes de cuidados periódicos;
- histórico completo de saúde.

---

## ✨ Ideia central

<div align="center">

  <img src="https://readme-typing-svg.demolab.com?font=Nunito&weight=600&size=22&duration=3500&pause=1000&color=A66B45&center=true&vCenter=true&width=700&lines=Menos+esquecimento.;Mais+organiza%C3%A7%C3%A3o.;Mais+cuidado+com+quem+tem+patas." />

</div>

O nome **Faro** remete ao instinto, ao cuidado e à atenção.

Assim como os pets usam o faro para reconhecer o mundo ao redor, a plataforma ajuda tutores a encontrarem e organizarem tudo o que importa na rotina de saúde dos seus animais.

---

## 🎯 Objetivo do projeto

Desenvolver uma plataforma digital que permita aos tutores registrar, acompanhar e organizar informações relacionadas à saúde, vacinação, medicamentos, consultas e cuidados gerais dos seus pets.

O Faro Pet busca apoiar a **guarda responsável**, os **cuidados preventivos** e o acesso rápido ao histórico de saúde do animal.

---

## 🐶 Para quem é o Faro Pet?

O projeto foi pensado principalmente para:

| Público | Necessidade |
|--------|-------------|
| 🐕 Tutor de primeira viagem | Organizar vacinas, consultas e cuidados iniciais |
| 🐈 Tutor com vários pets | Acompanhar datas e históricos diferentes |
| 🐾 Protetores independentes | Registrar cuidados de animais resgatados |
| 🏥 Clínicas veterinárias futuras | Consultar históricos digitais de forma prática |

---

## 💡 Problema identificado

Muitos tutores ainda controlam a saúde dos pets de forma fragmentada:

- carteira de vacinação física;
- fotos soltas no celular;
- mensagens no WhatsApp;
- anotações em papel;
- lembretes manuais;
- memória do tutor.

Isso pode causar perda de informações importantes, esquecimento de vacinas, dificuldade em acompanhar sintomas e problemas para compartilhar dados com veterinários.

---

## 🚀 Solução proposta

O **Faro Pet** centraliza as informações de saúde do pet em um único ambiente digital.

A plataforma permite que o tutor:

- cadastre seus pets;
- registre vacinas;
- acompanhe próximas doses;
- organize medicamentos;
- agende consultas;
- receba lembretes;
- consulte o histórico do animal;
- visualize dados já carregados mesmo offline.

> O Faro Pet não substitui orientação veterinária.  
> A plataforma organiza informações e ajuda o tutor a acompanhar os cuidados do pet.

---

## 🧩 Funcionalidades principais

### 🐾 Cadastro de pets

O tutor pode cadastrar os dados básicos do animal:

- nome;
- espécie;
- raça;
- sexo;
- data de nascimento;
- porte;
- peso;
- foto;
- observações.

---

### 💉 Carteira de vacinação

O sistema permite registrar vacinas aplicadas e acompanhar próximas doses.

Cada vacina pode conter:

- nome da vacina;
- data de aplicação;
- próxima dose;
- periodicidade;
- categoria;
- status;
- lote;
- comprovante;
- observações.

---

### 🔔 Lembretes inteligentes

O Faro Pet gera lembretes para ajudar o tutor a não esquecer cuidados importantes.

Tipos de lembretes previstos:

- vacina próxima;
- vacina vencida;
- consulta agendada;
- retorno veterinário;
- medicamento em andamento;
- medicamento atrasado;
- lembrete personalizado.

---

### 📅 Agendamentos

O tutor pode criar agendamentos para:

- consultas;
- vacinas;
- retornos;
- exames;
- emergências;
- banho e tosa;
- outros compromissos.

Cada agendamento pode ter status como:

- pendente;
- confirmado;
- concluído;
- cancelado;
- remarcado.

---

### 📋 Histórico de saúde

O histórico reúne os principais registros do pet em ordem cronológica.

Pode incluir:

- vacinas;
- medicamentos;
- consultas;
- sintomas;
- anexos;
- observações.

---

### 📎 Anexos e comprovantes

O sistema prevê o envio de imagens ou documentos relacionados ao pet, como:

- foto da carteira de vacinação;
- comprovante de vacina;
- exames;
- receitas;
- documentos clínicos.

---

### 📱 PWA e acesso offline

O Faro Pet foi pensado como uma **Progressive Web App**.

Isso significa que a aplicação poderá ser acessada pelo navegador, instalada no dispositivo e usada parcialmente sem internet.

Na primeira versão, o modo offline prioriza a consulta de dados já carregados.

---

## 🧠 Regras importantes

### Status vacinal

| Status | Quando aparece |
|-------|----------------|
| ✅ Em dia | Vacina aplicada e próxima dose ainda válida |
| ⚠️ Próxima do vencimento | Próxima dose dentro da janela de alerta |
| 🚨 Vencida | Data da próxima dose ultrapassada |
| 📭 Sem histórico | Nenhuma vacina registrada |
| 📝 Pendente de validação | Registro incompleto ou sem data confiável |

---

### Alertas de vacinação

O sistema pode exibir alertas em momentos como:

- 30 dias antes do vencimento;
- 7 dias antes;
- no dia do vencimento;
- após a vacina vencer;
- quando o histórico estiver incompleto.

---

## 🛠️ Tecnologias previstas

<div align="center">

  <img src="https://skillicons.dev/icons?i=react,ts,vite,nodejs,postgres,html,css,js,vercel" />

</div>

<br />

| Camada | Tecnologia |
|-------|------------|
| Frontend | React + TypeScript + Vite |
| Backend | Node.js com Express ou NestJS |
| Banco de dados | PostgreSQL |
| Autenticação | Token JWT |
| PWA | Manifest + Service Worker |
| Offline | Cache + IndexedDB |
| Deploy | Vercel |

---

## 🏗️ Arquitetura conceitual

```txt
Usuário / Tutor
      ↓
Frontend PWA — React + TypeScript
      ↓
Camada de serviços frontend
      ↓
API Backend — Node.js + REST
      ↓
Camada de domínio
      ↓
Banco de dados
      ↓
Serviços externos futuros

