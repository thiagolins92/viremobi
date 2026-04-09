import { useState, useId, type FormEvent, type ChangeEvent } from 'react';
import {
  User,
  CreditCard,
  Phone,
  Mail,
  Users,
  MapPin,
  Package,
  ShieldCheck,
  CheckCircle2,
  ClipboardList,
} from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { WHATSAPP_PHONE } from '../../utils/constants';
import styles from './SignupForm.module.css';

/* -------------------------------------------------- */
/*  Masks                                             */
/* -------------------------------------------------- */

function maskCPF(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9)
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 7)
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/* -------------------------------------------------- */
/*  Validation                                        */
/* -------------------------------------------------- */

function isValidCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, '');
  return digits.length === 11;
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 11;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* -------------------------------------------------- */
/*  Constants                                         */
/* -------------------------------------------------- */

const CITIES = [
  'Rio de Janeiro',
  'Niterói',
  'São Gonçalo',
  'Duque de Caxias',
  'Nova Iguaçu',
  'Outra',
] as const;

const PLANS = [
  { value: 'semanal', label: 'Semanal - R$249/semana' },
  { value: 'minha-bike', label: 'Minha Bike - R$289/semana' },
  { value: 'mensal', label: 'Mensal - R$899/mês' },
] as const;

/* -------------------------------------------------- */
/*  Types                                             */
/* -------------------------------------------------- */

interface FormData {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  indicacao: string;
  cidade: string;
  plano: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const INITIAL_DATA: FormData = {
  nome: '',
  cpf: '',
  telefone: '',
  email: '',
  indicacao: '',
  cidade: '',
  plano: '',
};

/* -------------------------------------------------- */
/*  Component                                         */
/* -------------------------------------------------- */

export function SignupForm() {
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [ref, isVisible] = useInView(0.1);
  const formId = useId();

  /* -- helpers ---------------------------------------- */

  function handleChange(field: keyof FormData, value: string) {
    let masked = value;
    if (field === 'cpf') masked = maskCPF(value);
    if (field === 'telefone') masked = maskPhone(value);

    setData((prev) => ({ ...prev, [field]: masked }));

    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function handleBlur(field: keyof FormData) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  }

  function validateField(field: keyof FormData): boolean {
    const value = data[field].trim();
    let error = '';

    switch (field) {
      case 'nome':
        if (!value) error = 'Informe seu nome completo';
        else if (value.length < 3) error = 'Nome muito curto';
        break;
      case 'cpf':
        if (!value) error = 'Informe seu CPF';
        else if (!isValidCPF(value)) error = 'CPF incompleto';
        break;
      case 'telefone':
        if (!value) error = 'Informe seu telefone';
        else if (!isValidPhone(value)) error = 'Telefone incompleto';
        break;
      case 'email':
        if (!value) error = 'Informe seu email';
        else if (!isValidEmail(value)) error = 'Email inválido';
        break;
      case 'cidade':
        if (!value) error = 'Selecione sua cidade';
        break;
      case 'plano':
        if (!value) error = 'Selecione um plano';
        break;
    }

    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error }));
      return false;
    }
    return true;
  }

  function validateAll(): boolean {
    const fields: (keyof FormData)[] = ['nome', 'cpf', 'telefone', 'email', 'cidade', 'plano'];
    const allTouched: Partial<Record<keyof FormData, boolean>> = {};
    let valid = true;

    for (const field of fields) {
      allTouched[field] = true;
      if (!validateField(field)) valid = false;
    }

    setTouched((prev) => ({ ...prev, ...allTouched }));
    return valid;
  }

  function buildWhatsAppMessage(): string {
    const planLabel = PLANS.find((p) => p.value === data.plano)?.label ?? data.plano;
    const lines = [
      `Oi! Quero me cadastrar na ViRe Mobi!`,
      ``,
      `Nome: ${data.nome}`,
      `CPF: ${data.cpf}`,
      `Telefone: ${data.telefone}`,
      `Email: ${data.email}`,
      data.indicacao ? `Indicação: ${data.indicacao}` : '',
      `Cidade: ${data.cidade}`,
      `Plano: ${planLabel}`,
    ];
    return lines.filter(Boolean).join('\n');
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!validateAll()) return;

    setLoading(true);

    // Small delay for visual feedback, then redirect to WhatsApp
    setTimeout(() => {
      const message = buildWhatsAppMessage();
      const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      setLoading(false);
      setSuccess(true);
    }, 600);
  }

  /* -- field class helpers ----------------------------- */

  function inputClass(field: keyof FormData): string {
    const classes = [styles.input];
    if (touched[field] && errors[field]) classes.push(styles.inputError);
    else if (touched[field] && data[field].trim() && !errors[field]) classes.push(styles.inputValid);
    return classes.join(' ');
  }

  function selectClass(field: keyof FormData): string {
    const classes = [styles.select];
    if (touched[field] && errors[field]) classes.push(styles.inputError);
    else if (touched[field] && data[field] && !errors[field]) classes.push(styles.inputValid);
    return classes.join(' ');
  }

  /* -- render ----------------------------------------- */

  return (
    <section
      id="cadastro"
      className={styles.section}
      aria-label="Formulario de cadastro"
    >
      <div
        ref={ref}
        className={`${styles.container} ${isVisible ? styles.visible : ''}`}
      >
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            <ClipboardList size={16} />
            Cadastro
          </span>
          <h2 className={styles.title}>Cadastre-se agora</h2>
          <p className={styles.subtitle}>
            Preencha seus dados e comece a faturar com sua bike elétrica
          </p>
        </div>

        {/* Card */}
        <div className={styles.card}>
          {success ? (
            <div className={styles.successOverlay}>
              <div className={styles.successIcon}>
                <CheckCircle2 size={32} />
              </div>
              <p className={styles.successTitle}>Cadastro enviado!</p>
              <p className={styles.successText}>
                Seus dados foram enviados pelo WhatsApp. Nossa equipe vai entrar em contato em breve para liberar sua bike.
              </p>
            </div>
          ) : (
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              noValidate
              aria-label="Formulario de cadastro ViRe Mobi"
            >
              {/* Nome */}
              <div className={styles.field}>
                <label htmlFor={`${formId}-nome`} className={styles.label}>
                  <User size={14} />
                  Nome completo <span className={styles.required}>*</span>
                </label>
                <input
                  id={`${formId}-nome`}
                  type="text"
                  placeholder="Seu nome completo"
                  value={data.nome}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('nome', e.target.value)}
                  onBlur={() => handleBlur('nome')}
                  className={inputClass('nome')}
                  autoComplete="name"
                />
                {touched.nome && errors.nome && (
                  <p className={styles.errorMessage} role="alert">{errors.nome}</p>
                )}
              </div>

              {/* CPF + Telefone */}
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor={`${formId}-cpf`} className={styles.label}>
                    <CreditCard size={14} />
                    CPF <span className={styles.required}>*</span>
                  </label>
                  <input
                    id={`${formId}-cpf`}
                    type="text"
                    inputMode="numeric"
                    placeholder="000.000.000-00"
                    value={data.cpf}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('cpf', e.target.value)}
                    onBlur={() => handleBlur('cpf')}
                    className={inputClass('cpf')}
                    autoComplete="off"
                  />
                  {touched.cpf && errors.cpf && (
                    <p className={styles.errorMessage} role="alert">{errors.cpf}</p>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor={`${formId}-telefone`} className={styles.label}>
                    <Phone size={14} />
                    Telefone (WhatsApp) <span className={styles.required}>*</span>
                  </label>
                  <input
                    id={`${formId}-telefone`}
                    type="tel"
                    inputMode="numeric"
                    placeholder="(00) 00000-0000"
                    value={data.telefone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('telefone', e.target.value)}
                    onBlur={() => handleBlur('telefone')}
                    className={inputClass('telefone')}
                    autoComplete="tel"
                  />
                  {touched.telefone && errors.telefone && (
                    <p className={styles.errorMessage} role="alert">{errors.telefone}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className={styles.field}>
                <label htmlFor={`${formId}-email`} className={styles.label}>
                  <Mail size={14} />
                  Email <span className={styles.required}>*</span>
                </label>
                <input
                  id={`${formId}-email`}
                  type="email"
                  placeholder="seu@email.com"
                  value={data.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={inputClass('email')}
                  autoComplete="email"
                />
                {touched.email && errors.email && (
                  <p className={styles.errorMessage} role="alert">{errors.email}</p>
                )}
              </div>

              {/* Indicacao */}
              <div className={styles.field}>
                <label htmlFor={`${formId}-indicacao`} className={styles.label}>
                  <Users size={14} />
                  Responsável por indicação
                </label>
                <input
                  id={`${formId}-indicacao`}
                  type="text"
                  placeholder="Nome de quem te indicou (opcional)"
                  value={data.indicacao}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('indicacao', e.target.value)}
                  className={styles.input}
                  autoComplete="off"
                />
              </div>

              {/* Cidade + Plano */}
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor={`${formId}-cidade`} className={styles.label}>
                    <MapPin size={14} />
                    Sua cidade <span className={styles.required}>*</span>
                  </label>
                  <select
                    id={`${formId}-cidade`}
                    value={data.cidade}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange('cidade', e.target.value)}
                    onBlur={() => handleBlur('cidade')}
                    className={selectClass('cidade')}
                  >
                    <option value="">Selecione</option>
                    {CITIES.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  {touched.cidade && errors.cidade && (
                    <p className={styles.errorMessage} role="alert">{errors.cidade}</p>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor={`${formId}-plano`} className={styles.label}>
                    <Package size={14} />
                    Plano de interesse <span className={styles.required}>*</span>
                  </label>
                  <select
                    id={`${formId}-plano`}
                    value={data.plano}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange('plano', e.target.value)}
                    onBlur={() => handleBlur('plano')}
                    className={selectClass('plano')}
                  >
                    <option value="">Selecione</option>
                    {PLANS.map((plan) => (
                      <option key={plan.value} value={plan.value}>{plan.label}</option>
                    ))}
                  </select>
                  {touched.plano && errors.plano && (
                    <p className={styles.errorMessage} role="alert">{errors.plano}</p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className={styles.spinner} />
                    Enviando...
                  </>
                ) : (
                  'Enviar cadastro'
                )}
              </button>
            </form>
          )}

          {/* Note */}
          {!success && (
            <p className={styles.note}>
              <ShieldCheck size={14} />
              Seus dados estão seguros. Entraremos em contato pelo WhatsApp.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
