const donationCampaignsEn = [
    {
        id: 1,
        title: "Diwali Maha Aarti",
        desc: "Join us for a grand Diwali celebration with lights, prayers, and blessings from the divine goddess.",
        image: "https://images.unsplash.com/photo-1561570106-a886f343ca5e?q=80&w=2070&auto=format&fit=crop",
        daysLeft: 7,
        isFeatured: true
    },
    {
        id: 2,
        title: "Temple Renovation",
        desc: "Support the restoration of our ancient heritage structure.",
        image: "https://images.unsplash.com/photo-1547906733-87a177a52f99?q=80&w=2070",
        daysLeft: 30,
        isFeatured: false
    },
    {
        id: 3,
        title: "Annadanam Seva",
        desc: "Contribute to the daily feeding of pilgrims and the needy.",
        image: "https://images.unsplash.com/photo-1590077423771-74075155f9f6?q=80&w=2070",
        daysLeft: 15,
        isFeatured: false
    }
];

const donationCampaignsHi = [
    {
        id: 1,
        title: "दिवाली महा आरती",
        desc: "दिव्य देवी के आशीर्वाद, प्रार्थना और रोशनी के साथ भव्य दिवाली उत्सव में हमारे साथ शामिल हों।",
        image: "https://images.unsplash.com/photo-1561570106-a886f343ca5e?q=80&w=2070&auto=format&fit=crop",
        daysLeft: 7,
        isFeatured: true
    },
    {
        id: 2,
        title: "मंदिर जीर्णोद्धार",
        desc: "हमारी प्राचीन विरासत संरचना के जीर्णोद्धार का समर्थन करें।",
        image: "https://images.unsplash.com/photo-1547906733-87a177a52f99?q=80&w=2070",
        daysLeft: 30,
        isFeatured: false
    },
    {
        id: 3,
        title: "अन्नदान सेवा",
        desc: "तीर्थयात्रियों और जरूरतमंदों के दैनिक भोजन में योगदान करें।",
        image: "https://images.unsplash.com/photo-1590077423771-74075155f9f6?q=80&w=2070",
        daysLeft: 15,
        isFeatured: false
    }
];

export const donationCampaigns = {
    en: donationCampaignsEn,
    hi: donationCampaignsHi
};

export const bankDetails = {
    accountName: "Organization",
    accountNumber: "2223330000456987",
    ifsc: "WRDSB10BNKP15",
    bankName: "State Bank of India"
};

export const upiDetails = {
    mobile: "8939406129",
    upiId: "21551",
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=temple@upi&pn=Temple"
};

export const donationStats = {
    totalRaised: 124000,
    goal: 200000,
    contributors: 12354,
    daysLeft: 12
};
