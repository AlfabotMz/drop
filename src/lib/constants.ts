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
            headline: "⚠️ PROMOÇÃO VÁLIDA PARA AS PRÓXIMAS 10 UNIDADES",
            subheadline: "ECONOMIZE HOJE COM A CHAVA24 - PAGUE AO RECEBER"
        }
    },
    product: {
        id: "mini-liquidificador-portatil",
        name: "Mini Liquidificador Portátil",
        tagline: "Praticidade, Saúde e Economia no seu dia a dia",
        rating: {
            value: 4.8,
            count: 245
        },
        stock: {
            remaining_units: 10,
            low_stock_warning: true
        },
        price: {
            currency: "MZN",
            offers: [
                {
                    label: "01 Unidade",
                    old_price: 1200,
                    current_price: 1200,
                    icon: "p01.jpg"
                },
                {
                    label: "02 Unidades (Combo)",
                    old_price: 2400,
                    current_price: 2000,
                    savings: 0,
                    icon: "p02.jpg"
                }
            ]
        }
    },
    features: [
        "Bateria Recarregável via USB - Use em qualquer lugar",
        "Lâminas em Aço Inoxidável potentes para triturar frutas e gelo",
        "Capacidade ideal de 350ml para doses individuais",
        "Preparo Rápido: seu batido pronto em cerca de 30 segundos",
        "Fácil de Limpar: adicione água e detergente e ligue por segundos",
        "100% Portátil: cabe perfeitamente na sua mochila ou bolsa"
    ],
    specs: {
        capacidade: "350ml",
        carregamento: "USB (Cabo incluso)",
        material: "Plástico resistente (BPA Free) + Aço Inox",
        uso: "Individual e Portátil",
        alimentação: "Bateria interna recarregável",
        segurança: "Sistema de trava de encaixe para funcionamento"
    }
};

export const CONTACT_NUMBER = "872204494";
export const STORE_NAME = "CHAVA24";
