import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'chicken-teriyaki',
    title: 'Chicken Teriyaki Bento',
    category: 'Catering',
    price: 17000,
    originalPrice: 22000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCLeXdftKqSPGHQIx-itonUUY-Ifk5DLLtmK-HS7yLdg3GGJwEieyVfQLcBOuXh8g0z1y7MIJOI0Uj6tcMphp1bCjSA1PbcNE36gTmiD_HFXrjXfFePnWRsZaBUzC5WCdo0DGdOkPk_lLwwXdHr4BLmtZyb0ofggIPP_83gXi3Sn0DvMx4OWb214JNakZI3IJnjIU6aGVwHNMM04forSVfO7DU86DPJOs78G8Hq0L35PlcnVtBp-4L',
    tag: 'Catering',
    tagType: 'catering',
    calories: 450,
    protein: 25,
    carbs: 58,
    fat: 12,
    fiber: 4.2,
    description: 'Ayam teriyaki empuk dengan lumuran saus manis gurih racikan khas Bekalin.yu, disajikan lengkap bersama nasi pulen hangat dan sayuran segar (wortel & brokoli kukus). Menu seimbang dengan rasa lezat dan ramah di kantong.',
    batchInfo: '#BKL-2024-TK09',
    madeTime: 'Pagi ini (09:30 WIB)',
    bestBefore: '21:00 WIB',
  },
  {
    id: 'ayam-mentega',
    title: 'Ayam Mentega Gurih',
    category: 'Frozen Food',
    price: 18000,
    originalPrice: 23000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvpidbnNsmCB6u_897zSX3zGAq0108h1ogV6iLWi-M3VPvP9YV4nUEpnjtlSy65y_fCzMgaG3fVdHdnY7pOqyc1VD2z7066y302Vpr6SaGhrTw-OdXP_ECc65eIzH7YQKSFPoOVW-_h_HvMQ2ZP3Nqd2fXROgz4zyvbtmBgErWXKHXdB7tsay4xC4_wTrp4WOnLpcVQSQjyQwoecYCwkNYk9rYezN2gIT0i9tNwOdIgBZW-ETWGl9W',
    tag: 'Frozen Food',
    tagType: 'frozen',
    calories: 480,
    protein: 24,
    carbs: 54,
    fat: 14,
    fiber: 3.8,
    description: 'Ayam goreng gurih bermandikan saus mentega manis harum dan bawang bombay karamelisasi renyah dalam kemasan microwaveable vacuum.',
    batchInfo: '#BKL-2024-AM03',
    madeTime: 'Kemarin Siang (14:00 WIB)',
    bestBefore: 'Tahan 30 Hari di Freezer',
  },
  {
    id: 'chicken-katsu',
    title: 'Chicken Katsu Crispy',
    category: 'Catering',
    price: 16000,
    originalPrice: 20000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrq1Fxu99JbNsG6qhmxwnONYDaaJGsAkX93kVOa1cpojsF_qKCYMuTdKy3sdmy81e_fvOG_rFZxRNJx9uTqcIlaO1UVZh03Hb-V_kjUxRQ0AwkTsWf7KxwcQ4tMfzFW9xRIumHzwBdOKCo_AeyEU-VYZnQ3BgKXiL2uJfU6RRMtybSe_a_5gjO-WWt5Jqh2jAKqOcT5QdsTLYdG4-Kcr8VKQ6TK023DYfLHBsabN26-2DN86BLUY0K',
    tag: 'Hemat Kos',
    tagType: 'hemat',
    calories: 430,
    protein: 28,
    carbs: 60,
    fat: 11,
    fiber: 3.5,
    description: 'Dada ayam fillet berbalut tepung panko super renyah disajikan dengan saus kari gurih tonkatsu, nasi hangat, dan salad kol segar.',
    batchInfo: '#BKL-2024-KC12',
    madeTime: 'Pagi ini (09:45 WIB)',
    bestBefore: '21:00 WIB',
  },
  {
    id: 'beef-bulgogi',
    title: 'Beef Bulgogi Korea',
    category: 'Frozen Food',
    price: 19000,
    originalPrice: 25000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW63HaUpko87LsM7v6vzdmhdmsFIgzzaafF6vqF5CfRMYcYLuXfqFowb7VyFTTXajOTF3X88SPD_IRaQEu-jCTM0dg1Igur7YVuGP2rmLuTEP6A9wFxygizt4fIVestLYWrJ4PZlkG8VWobpj0cMTRX4KMYwDzPb9L6z3Vx0Hv5QmBdPDXYvqJ3FIP4NtV5uN52IHqhaTNXM_Me9qUKBQYnYnXkPaaMNOjsw79WYhv2STJ9U7Zyu56',
    tag: 'Frozen Food',
    tagType: 'frozen',
    calories: 460,
    protein: 26,
    carbs: 52,
    fat: 13,
    fiber: 3.2,
    description: 'Daging sapi iris empuk dimarinasi saus bulgogi khas Korea dengan aroma minyak wijen murni dan daun bawang gurih.',
    batchInfo: '#BKL-2024-BB07',
    madeTime: 'Kemarin Sore (16:30 WIB)',
    bestBefore: 'Tahan 30 Hari di Freezer',
  },
];

export const WEEKLY_PACKS = [
  {
    id: 'paket-3-hari',
    title: 'Paket 3 Hari Kos',
    description: '3 Porsi bento siap saji + bebas pilih menu',
    discountTag: 'Hemat Rp6.000',
    discountColor: 'bg-[#ffdad6] text-[#93000a]',
    price: 45000,
    originalPrice: 51000,
  },
  {
    id: 'paket-5-hari',
    title: 'Paket 5 Hari Kuliah',
    description: 'Senin - Jumat diantar langsung ke kampus/kos',
    discountTag: 'Paling Laris',
    discountColor: 'bg-[#aceec4] text-[#2f6e4c]',
    price: 70000,
    originalPrice: 85000,
  },
];

export const LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1UOYYzbnkrta1rB9JnoAO0KZBZXVW6vMOhKh18HFBIe4mkzoj67IreD7UsZa_kIJjk8196m30BSJOlvKz5dUdPkftmzfp_8l-cIvwRYFXJIJ09iajWPPPlcvjA-8d7aPXO-o9ZBChICuTF3_YJa_c2UR4xZtDcR8NGv2j37LAwGI4_cj5iS-AD32bBh-FyzXB3c4V-53KWOPm6CwKmG0TWtIuVPdTDH3OyTyhpFg4uByksihhlbdvhSneFs8SVmKSMELwoYft8s';

export const CHICKEN_TERIYAKI_HERO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwsq1zUmqmbALCHqPBJ4CygeHCw0dr0053Is8kr5ZWY7FgQFFDO_BqX6nPTf8sp6MaQcngzEr4nLhefu1poK4gNsHflq3suikcAwxfKtXrK7pdWehRy6bBnOWnRdsHYMrphZZC7VonkHqJlEshKydpDdWn0IBo3hjj-lSMBA8jrYlRY2QjshOX3iAuT_vwS-JhQbGJ0LuD9129HUcA8fVRR8SkcargSaI_2ZAiEKLg8H1fMbk5VivE';

export const CHICKEN_TERIYAKI_WOOD = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDe7e71E0xNLj1ciIySwx77YAq4LTct4yi45w46dbYKn6RzufMB62iiQE3ZbzdLvDxRiV44bQE6HErjvAkJrcKKeRYQdZZ68KyIDn1Xd5Qhu-w70i2KlTtCU1XKV8ZvwVKZoQ5slpYZ2waommSUod8mO1MIJatiUfV-xv50KmvJ1Y7CDuBU8W5bQhsa0Xp4uBZJ73mwRIBakav8UF6GijEplJIiiLTlmnaXDC0qN8C3lTcl9k-E3w-R';

export const DESKTOP_GALLERY_IMAGES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD1iOncofmmIG9QWbO3zs8y0TY-K9dJD3w0aoD8Qi-gMab0xs-A0gckrOwdunNJOF8wL18EpyQb8qHhIqFyvSj0_PDjpAFP9Vxen7lmZ2ObrDv9VZut7btnN9dYOV9CncOAWpBOU0BMmvuUVe6MdX4a-YJZGOUi06wFsR5eOCqSchkZYtPrTOJVxztL2v8DuM64uYrd3syNcus8T6EuzQ0s8J-Tkb1toNhna3_3S1XGwszbt7eMiBSw',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDu6BZToEF6_nFX28eedXbCE5Ph9eFzqbaLySrByxqfy13vKbYQjPgNndpR41AoI3FAZewcsMhZVdCq20LNlCJ7I70Du-hnPIsXyZUraP4jQhEDe4p01R09I86yW_yZKiX9purmV11eQRlhmA0Nih9O5ceHpul2sdxsDYDSVoiCTxqkJ9YUjDbIJeXbGWUMoprqAmwcRwoEFigV3UUJa4qkLxg_zLz0pzlNcSEzNZzFjJGhzf3m4KIV',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC_CIQ6zMGKis5pU5-srUCdlPxMXuwh8PKmPpD3bEyjTdTdE_aifUeoAUN6Bj9SFGX8C3hsWalMnjKZSYOu0qjqC9_s2h38gDJdIZAEgwf3QmjkPi6RFaPEBX72yIoqkxA2QeBIY8lCtg5QHPsBhlnyYnXZ59tQqWpI0RPlzf8ioFiM02bzpGdV_p0aGqQ6rpaTEQduUxA_RKeZbeG1npBsEJ1FgPsn9d2ubvYOXTeQVzda3C8Ai_ju',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBDvrA7kb_55z1oTxvaeBa5tNXQnWAY0jyuFe2IvXiw77TZXKpXz3Jmdj1zJMM7IsnrFDEMTj5pjXeeUOU3cbj9_l-rX7O8o20Dlcx-nXSEgyKWD-WkLkMJmDf4jH5gCxC-FKxUo5XO7Q47tLoDh2zFkHntScBdkBCwsdrvh57Vi-656yWE_ueHDZ3OI2t5My6jURtCncJhhoJZ5dCGVqIGIQrfuEeCuTOIOd1R1TYgAWNcyj-7jbmO',
];
