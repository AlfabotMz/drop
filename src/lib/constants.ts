export const PRODUCT_DATA = {
    meta: {
        language: "pt-PT",
        currency: "MZN",
        payment_mode: "cash_on_delivery",
        regions_supported: ["Maputo", "Matola", "Moçambique"],
        urgency_mode: true
    },
    top_alerts: {
        type: "repeating_banner",
        content: {
            headline: "ATENÇÃO Maputo e Matola",
            subheadline: "PAGUE SÓ AO RECEBER"
        }
    },
    product: {
        id: "panela-electrica-4l",
        name: "Panela Eléctrica",
        tagline: "A Revolução na Sua Cozinha",
        rating: {
            value: 4.9,
            count: 512
        },
        stock: {
            remaining_units: 6,
            low_stock_warning: true
        },
        price: {
            currency: "MZN",
            offers: [
                {
                    label: "01 Unidade",
                    old_price: 4000,
                    current_price: 3699,
                    icon: "pe6.png"
                },
                {
                    label: "02 Unidades (Combo)",
                    old_price: 8000,
                    current_price: 6500,
                    savings: 1500,
                    icon: "pe4.avif"
                }
            ]
        }
    },
    features: [
        "7 funções em 1: Arroz, Vapor, Sopas, Guisados, Fritura, Reaquecimento e Manter Aquecido",
        "Potência de até 1300W para aquecimento rápido",
        "Capacidade de 4 Litros",
        "Revestimento antiaderente de alta qualidade",
        "Certificação CE e proteção térmica"
    ],
    specs: {
        marca: "Saintciaga",
        modelo: "4L Multi-cooker",
        tensao: "220V",
        potencia: "1100W – 1300W",
        material: "Plástico resistente + fundo metálico composto",
        controle: "Painel digital no cabo"
    }
};

export const CONTACT_NUMBER = "872204494";
export const STORE_NAME = "CHAVA24";
