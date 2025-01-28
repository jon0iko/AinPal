const triviaData = [
    {
        id: 1,
        text: "The Legal Aid Services Act, 2000 ensures free legal assistance for citizens who cannot afford a lawyer."
    },
    {
        id: 2,
        text: "The Bangladesh Labour Act, 2006 guarantees maternity leave of 16 weeks for working women."
    },
    {
        id: 3,
        text: "Under the Child Marriage Restraint Act, 2017, marrying under the age of 18 is a punishable offense."
    },
    {
        id: 4,
        text: "The Premises Rent Control Act, 1991 protects tenants from unlawful eviction."
    },
    {
        id: 5,
        text: "The Consumer Rights Protection Act, 2009 ensures that consumers can lodge complaints against deceptive practices."
    },
    {
        id: 6,
        text: "Under the Road Transport Act, 2018, driving without a valid license can lead to fines or imprisonment."
    },
    {
        id: 7,
        text: "The Environment Conservation Act, 1995 prohibits industrial pollution without proper waste management systems."
    },
    {
        id: 8,
        text: "The Digital Security Act, 2018 makes cyberbullying and hacking punishable offenses in Bangladesh."
    },
    {
        id: 9,
        text: "The Transfer of Property Act, 1882 ensures a clear legal framework for transferring property ownership."
    },
    {
        id: 10,
        text: "The Muslim Marriage and Divorce (Registration) Act, 1974 mandates registration of marriages for legal recognition."
    },
    {
        id: 11,
        text: "The Domestic Violence (Prevention and Protection) Act, 2010 ensures legal protection for victims of domestic violence."
    },
    {
        id: 12,
        text: "The Right to Information Act, 2009 allows citizens to request information from government authorities."
    },
    {
        id: 13,
        text: "The Prevention and Suppression of Human Trafficking Act, 2012 criminalizes all forms of human trafficking."
    },
    {
        id: 14,
        text: "The Rights and Protection of Persons with Disabilities Act, 2013 ensures equal opportunities and rights for individuals with disabilities."
    },
    {
        id: 15,
        text: "The Smoking and Tobacco Products Usage (Control) Act, 2005 prohibits smoking in public places."
    },
    {
        id: 16,
        text: "The Acid Crime Control Act, 2002 imposes strict penalties for acid attacks."
    },
    {
        id: 17,
        text: "The Maintenance of Parents Act, 2013 obligates children to provide financial and social support to their elderly parents."
    },
    {
        id: 18,
        text: "The Factories Act, 1965 ensures the safety, health, and welfare of factory workers."
    },
    {
        id: 19,
        text: "Under the Code of Criminal Procedure, 1898, police cannot arrest without a warrant unless specific conditions are met."
    },
    {
        id: 20,
        text: "The Negotiable Instruments Act, 1881 makes dishonoring of cheques a punishable offense."
    },
    {
        id: 21,
        text: "The Environment Court Act, 2010 requires industries to conduct an Environmental Impact Assessment before starting operations."
    },
    {
        id: 22,
        text: "The Anti-Corruption Commission Act, 2004 established the Anti-Corruption Commission to combat corruption in Bangladesh."
    },
    {
        id: 23,
        text: "The High Court's directive in 2009 provides legal protection against workplace sexual harassment."
    },
    {
        id: 24,
        text: "The Disaster Management Act, 2012 ensures organized disaster response and relief operations in Bangladesh."
    },
    {
        id: 25,
        text: "The Wildlife (Conservation and Security) Act, 2012 prohibits hunting and trade of endangered wildlife species."
    },
    {
        id: 26,
        text: "The Primary Education (Compulsory) Act, 1990 ensures free and compulsory primary education for all children."
    },
    {
        id: 27,
        text: "The ICT Act, 2006 provides guidelines for cybersecurity and digital evidence."
    },
    {
        id: 28,
        text: "The Income Tax Ordinance, 1984 ensures taxpayers' right to appeal against tax assessments."
    },
    {
        id: 29,
        text: "The National Women Development Policy, 2011 aims to eliminate gender discrimination in all areas of society."
    },
    {
        id: 30,
        text: "The State Acquisition and Tenancy Act, 1950 protects the rights of landowners and tenants."
    },
    {
        id: 31,
        text: "Citizens can request police verification certificates for personal or official use from their local police station."
    },
    {
        id: 32,
        text: "The Births and Deaths Registration Act, 2004 mandates birth registration, which is required for school admission, passports, and other services."
    },
    {
        id: 33,
        text: "The legal marriage age in Bangladesh is 18 for females and 21 for males as per the Child Marriage Restraint Act, 2017."
    },
    {
        id: 34,
        text: "The Passport Act, 1920 ensures that every citizen of Bangladesh has the right to apply for and obtain a passport for travel."
    },
    {
        id: 35,
        text: "As per the directives of the Bangladesh Telecommunication Regulatory Commission, all SIM cards must be registered under the user's national ID."
    },
    {
        id: 36,
        text: "Bangladesh Bank ensures every citizen has the right to open a bank account with just their national ID card."
    },
    {
        id: 37,
        text: "The Land Reform Board allows citizens to apply for land mutation online to update ownership records."
    },
    {
        id: 38,
        text: "Every child has the right to free primary education as mandated by the Primary Education (Compulsory) Act, 1990."
    },
    {
        id: 39,
        text: "The Electricity Act, 2018 allows citizens to file complaints against irregularities in electricity supply or billing."
    },
    {
        id: 40,
        text: "Public hospitals provide free maternal health care services, including prenatal and postnatal care."
    },
    {
        id: 41,
        text: "The National Strategy for Water Supply and Sanitation ensures access to clean drinking water and sanitation for all."
    },
    {
        id: 42,
        text: "The Road Transport Act, 2018 mandates that drivers must yield to pedestrians at zebra crossings."
    },
    {
        id: 43,
        text: "The Dowry Prohibition Act, 1980 makes giving, taking, or demanding dowry a punishable offense."
    },
    {
        id: 44,
        text: "The Premises Rent Control Act, 1991 ensures tenants cannot be evicted without a court order."
    },
    {
        id: 45,
        text: "Citizens can report corruption or bribe demands for utility connections to the Anti-Corruption Commission hotline."
    },
    {
        id: 46,
        text: "Citizens can now pay income tax online through the National Board of Revenue's e-payment system."
    },
    {
        id: 47,
        text: "The Bangladesh Road Transport Authority issues driving licenses that can be applied for online."
    },
    {
        id: 48,
        text: "Homeowners must ensure fire safety measures are in place as per the Fire Prevention and Extinguishing Act, 2003."
    },
    {
        id: 49,
        text: "The Environment Conservation Act, 1995 prohibits excessive noise in residential areas."
    },
    {
        id: 50,
        text: "Low-income citizens can apply for free legal aid through the District Legal Aid Office under the Legal Aid Services Act, 2000."
    },
    {
        id: 51,
        text: "The Bangladesh Food Safety Authority investigates complaints about adulterated or unsafe food."
    },
    {
        id: 52,
        text: "The Directorate of National Consumer Rights Protection resolves disputes between consumers and businesses."
    },
    {
        id: 53,
        text: "The Maintenance of Parents Act, 2013 obligates children to care for their elderly parents financially."
    },
    {
        id: 54,
        text: "Citizens can update their national ID card information online through the Election Commission website."
    },
    {
        id: 55,
        text: "The Bangladesh Police provides an online platform to file general diaries and complaints digitally."
    },
    {
        id: 56,
        text: "Farmers can purchase government-subsidized fertilizers from authorized dealers."
    },
    {
        id: 57,
        text: "The Bangladesh Meteorological Department issues early warnings for cyclones and floods via SMS alerts."
    },
    {
        id: 58,
        text: "Banks offer special low-interest loan schemes to support women entrepreneurs in starting businesses."
    },
    {
        id: 59,
        text: "The Marine Fisheries Ordinance, 1983 prohibits fishing during the hilsa breeding season to conserve fish populations."
    },
    {
        id: 60,
        text: "Citizens can request government records or information under the Right to Information Act, 2009."
    }
];


export default triviaData;