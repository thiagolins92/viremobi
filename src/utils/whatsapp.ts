import { WHATSAPP_PHONE } from './constants';

function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export const whatsappLinks = {
  generic: buildWhatsAppUrl('Oi! Quero saber mais sobre o aluguel de bike elétrica'),
  semanal: buildWhatsAppUrl('Oi! Quero alugar no plano semanal (R$249/sem)'),
  'minha-bike': buildWhatsAppUrl('Oi! Quero alugar no plano Minha Bike (R$289/sem)'),
  mensal: buildWhatsAppUrl('Oi! Quero alugar no plano mensal (R$899/mês)'),
  calculator: buildWhatsAppUrl('Oi! Vi a calculadora de ganhos e quero começar!'),
} as const;
