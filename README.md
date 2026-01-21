# Agent UI

> **Objetivo:** criar uma UI genérica, modular e personalizável para agentes de IA self-hosted, permitindo que empresas e clientes adaptem a experiência, visual, integrações e fluxos às suas próprias demandas.

## 📌 **Descrição**

O **Agent UI** é uma interface moderna e flexível construída para ser utilizada em conjunto com agentes de Inteligência Artificial **self-hosted**. A proposta é permitir que qualquer organização possa:

* hospedar seu próprio agente
* personalizar a interface e o comportamento
* definir contextos, fluxos, personas e permissões
* integrar a fontes de dados internas
* utilizar recursos avançados sem depender de plataformas externas

O projeto parte da premissa de que empresas e equipes terão necessidades distintas — tanto em UI/UX quanto em integrações — e que a solução precisa ser modular, configurável e evolutiva.


## 🧱 **Arquitetura e Stack Técnica**

Atualmente o projeto utiliza:

**Frontend**
* **Vite**
* **React**
* **TypeScript**
* **TailwindCSS**
* **PNPM** como package manager


## 🎯 **Objetivo do Produto**

A proposta do **vaultUI** é se tornar uma interface **genérica e adaptável**, capaz de atender:

* empresas que desejam **agentes de IA dedicados**
* clientes com requisitos de **compliance e privacidade**
* demandas corporativas com **dados proprietários**
* times de atendimento / suporte / consultoria / automação
* indústria & uso corporativo especializado

Também serve como base para projetos que utilizam **RAG**, **GPT local/self-hosted**, **fine-tuning**, **LLMs privados** e integrações com dados internos (bancos, CRMs, ERPs, etc).

## 🚀 **Visão**

* **Autonomia**: permitir ao cliente operar seu próprio stack
* **Privacidade**: dados não saem da empresa
* **Modularidade**: componente plugável + extensível
* **Personalização**: UI moldável ao negócio

## 🗺️ **Roadmap inicial (high-level)**

* [x] Base do chat + Contexto
* [ ] Suporte a múltiplas personas
* [ ] Integração com RAG (via API)
* [ ] Providers plugáveis (OpenAI / Ollama / Local / Outros)
* [ ] Controle de usuários e permissões
* [x] Layout white-label + customização visual
* [x] Multi-cliente / multi-agente
* [ ] Docker + self-hosted fácil
* [ ] Painel administrativo + insights

