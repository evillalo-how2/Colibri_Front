import {
    FiBookOpen,
    FiCalendar,
    FiHeart,
    FiMapPin,
    FiMonitor,
    FiShoppingBag,
    FiSun,
    FiUsers,
} from "react-icons/fi";

export const navItems = [
    { label: "Inicio", href: "#inicio" },
    { label: "Sobre Karen", href: "#sobre-karen" },
    { label: "Servicios", href: "#servicios" },
    { label: "Eventos", href: "#eventos" },
    { label: "Contacto", href: "#contacto" },
];

export const services = [
    {
        title: "Terapia presencial",
        description:
            "Acompañamiento terapéutico en Chihuahua para trabajar procesos emocionales, personales y de reconexión.",
        icon: FiHeart,
    },
    {
        title: "Terapia online",
        description:
            "Sesiones a distancia para acompañarte desde cualquier lugar con un espacio seguro, cálido y profesional.",
        icon: FiMonitor,
    },
    {
        title: "Cursos y talleres",
        description:
            "Experiencias de aprendizaje, liderazgo y crecimiento personal enfocadas en reconectar contigo.",
        icon: FiBookOpen,
    },
    {
        title: "Retiros y eventos",
        description:
            "Espacios vivenciales para sanar, reflexionar y fortalecer tu bienestar emocional, mental y espiritual.",
        icon: FiCalendar,
    },
];

export const focusItems = [
    {
        title: "Terapia humanista",
        description:
            "Un acompañamiento centrado en la persona, sus emociones, historia y recursos internos.",
        icon: FiHeart,
    },
    {
        title: "Reconexión personal",
        description:
            "Procesos para volver a escucharte, comprenderte y fortalecer tu bienestar desde dentro.",
        icon: FiSun,
    },
    {
        title: "Acompañamiento integral",
        description:
            "Terapia, cursos, talleres y experiencias diseñadas para acompañar distintas etapas de vida.",
        icon: FiUsers,
    },
];

export const productItems = [
    {
        title: "Cursos",
        description:
            "Programas y talleres para crecimiento personal, liderazgo y reconexión emocional.",
        icon: FiBookOpen,
    },
    {
        title: "Eventos",
        description:
            "Retiros, ceremonias y experiencias grupales para sanar, compartir y reflexionar.",
        icon: FiCalendar,
    },
    {
        title: "Recursos",
        description:
            "Materiales, productos o contenidos de apoyo para acompañar tu proceso personal.",
        icon: FiShoppingBag,
    },
];

export const eventItems = [
    {
        title: "Retiros terapéuticos",
        description:
            "Experiencias diseñadas para hacer una pausa, sanar y reconectar con tu bienestar.",
    },
    {
        title: "Talleres de crecimiento",
        description:
            "Espacios prácticos para trabajar emociones, liderazgo, autoestima y procesos personales.",
    },
    {
        title: "Cursos motivacionales",
        description:
            "Sesiones grupales enfocadas en reflexión, aprendizaje y fortalecimiento personal.",
    },
];

export const contactInfo = {
    email: "karenchico@gmail.com",
    phone: "(52) 614-220-8998",
    location: "Chihuahua, Chihuahua",
};

export const contactCards = [
    {
        label: "Correo",
        value: contactInfo.email,
        icon: FiMapPin,
    },
    {
        label: "Teléfono",
        value: contactInfo.phone,
        icon: FiHeart,
    },
    {
        label: "Ubicación",
        value: contactInfo.location,
        icon: FiMapPin,
    },
];