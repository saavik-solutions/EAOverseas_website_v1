export const CONTACTS = {
    whatsapp: {
        number: '+1 (408) 741 6166',
        link: 'https://wa.me/14087416166',
        message: 'Hello! I am interested in learning more about study abroad opportunities with EAOverseas.',
    },
    support: {
        email: 'edu@eaoverseas.com',
        phone: '+1 (408) 741 6166',
        phoneSecondary: '+1 (408) 741 6166',
        address: '6250 West Park Dr Ste 319, Houston, TX 77057 United States',
    },
    socials: {
        facebook: 'https://facebook.com/eaoverseas',
        youtube: 'https://youtube.com/eaoverseas',
        twitter: 'https://twitter.com/eaoverseas',
        instagram: 'https://instagram.com/eaoverseas',
        linkedin: 'https://linkedin.com/company/eaoverseas',
    }
};

export const getWhatsAppLink = (message?: string) => {
    const baseUrl = `https://wa.me/14087416166`;
    if (message) {
        return `${baseUrl}?text=${encodeURIComponent(message)}`;
    }
    return `${baseUrl}?text=${encodeURIComponent(CONTACTS.whatsapp.message)}`;
};
