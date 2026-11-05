/**
 * Offline / Instant fallback catalog containing all assets & categories
 * from the original database (https://asset-booking-backend.vercel.app).
 */
export const OLD_DATABASE_CATEGORIES = [
  {
    "id": 13,
    "name": "Storage & Media",
    "subcategories": [
      {
        "id": 11,
        "name": "Lexar 80 GB memory cards",
        "category": 13
      },
      {
        "id": 12,
        "name": "Lexar 160 GB memory cards",
        "category": 13
      }
    ]
  },
  {
    "id": 14,
    "name": "Camera & Power",
    "subcategories": [
      {
        "id": 13,
        "name": "Sony FX3 cameras",
        "category": 14
      },
      {
        "id": 14,
        "name": "Camera batteries",
        "category": 14
      },
      {
        "id": 15,
        "name": "Battery chargers",
        "category": 14
      },
      {
        "id": 16,
        "name": "50mm lens sony",
        "category": 14
      },
      {
        "id": 17,
        "name": "50mm gmaster lens",
        "category": 14
      }
    ]
  },
  {
    "id": 15,
    "name": "Audio Equipment",
    "subcategories": [
      {
        "id": 18,
        "name": "DJI Mic Mini",
        "category": 15
      },
      {
        "id": 19,
        "name": "Audio-Technica AT2040 microphones",
        "category": 15
      },
      {
        "id": 20,
        "name": "Shure SM58 microphone",
        "category": 15
      },
      {
        "id": 21,
        "name": "presonus 10-channel audio mixer",
        "category": 15
      },
      {
        "id": 22,
        "name": "Podcast mic stands",
        "category": 15
      },
      {
        "id": 23,
        "name": "table podcast muc stand",
        "category": 15
      },
      {
        "id": 24,
        "name": "Mic stand",
        "category": 15
      },
      {
        "id": 32,
        "name": "Speakers 800w",
        "category": 15
      }
    ]
  },
  {
    "id": 16,
    "name": "Lighting Equipment",
    "subcategories": [
      {
        "id": 25,
        "name": "Godox 300 W bi-color lights (with softbox)",
        "category": 16
      },
      {
        "id": 26,
        "name": "Godox 300 W RGB lights",
        "category": 16
      },
      {
        "id": 27,
        "name": "85 cm grid softboxes",
        "category": 16
      }
    ]
  },
  {
    "id": 17,
    "name": "Stands & support",
    "subcategories": [
      {
        "id": 28,
        "name": "Boom stands",
        "category": 17
      },
      {
        "id": 29,
        "name": "Light stands",
        "category": 17
      },
      {
        "id": 30,
        "name": "C-stand with screen holder",
        "category": 17
      }
    ]
  },
  {
    "id": 18,
    "name": "Backdrop",
    "subcategories": [
      {
        "id": 31,
        "name": "Green screen (9 ft)",
        "category": 18
      }
    ]
  }
];

export const OLD_DATABASE_ASSETS = [
  {
    "id": 16,
    "name": "160 gb lexar card",
    "description": "160 gb lexar card",
    "details": "160 gb lexar card",
    "serial_number": "01",
    "location": {
      "id": 1,
      "name": "Bangalore",
      "description": "Bangalore"
    },
    "category": {
      "id": 13,
      "name": "Storage & Media",
      "subcategories": [
        {
          "id": 11,
          "name": "Lexar 80 GB memory cards",
          "category": 13
        },
        {
          "id": 12,
          "name": "Lexar 160 GB memory cards",
          "category": 13
        }
      ]
    },
    "subcategory": {
      "id": 12,
      "name": "Lexar 160 GB memory cards",
      "category": 13
    },
    "available": true,
    "total_quantity": 2,
    "image": "https://res.cloudinary.com/dcqegufoe/image/upload/v1/media/assets/images/WhatsApp_Image_2026-02-26_at_3.02.42_PM",
    "image_url": "https://res.cloudinary.com/dcqegufoe/image/upload/media/assets/images/WhatsApp_Image_2026-02-26_at_3.02.42_pm",
    "status": "2 Units Available"
  },
  {
    "id": 17,
    "name": "80gb lexar card",
    "description": "",
    "details": "",
    "serial_number": "02",
    "location": {
      "id": 1,
      "name": "Bangalore",
      "description": "Bangalore"
    },
    "category": {
      "id": 13,
      "name": "Storage & Media",
      "subcategories": [
        {
          "id": 11,
          "name": "Lexar 80 GB memory cards",
          "category": 13
        },
        {
          "id": 12,
          "name": "Lexar 160 GB memory cards",
          "category": 13
        }
      ]
    },
    "subcategory": {
      "id": 11,
      "name": "Lexar 80 GB memory cards",
      "category": 13
    },
    "available": true,
    "total_quantity": 2,
    "image": "https://res.cloudinary.com/dcqegufoe/image/upload/v1/media/assets/images/WhatsApp_Image_2026-02-26_at_3.02.49_PM",
    "image_url": "https://res.cloudinary.com/dcqegufoe/image/upload/media/assets/images/WhatsApp_Image_2026-02-26_at_3.02.49_pm",
    "status": "2 Units Available"
  },
  {
    "id": 18,
    "name": "Sony fx3",
    "description": "Sony fx3",
    "details": "Sony fx3",
    "serial_number": "03",
    "location": {
      "id": 1,
      "name": "Bangalore",
      "description": "Bangalore"
    },
    "category": {
      "id": 14,
      "name": "Camera & Power",
      "subcategories": [
        {
          "id": 13,
          "name": "Sony FX3 cameras",
          "category": 14
        },
        {
          "id": 14,
          "name": "Camera batteries",
          "category": 14
        },
        {
          "id": 15,
          "name": "Battery chargers",
          "category": 14
        },
        {
          "id": 16,
          "name": "50mm lens sony",
          "category": 14
        },
        {
          "id": 17,
          "name": "50mm gmaster lens",
          "category": 14
        }
      ]
    },
    "subcategory": {
      "id": 13,
      "name": "Sony FX3 cameras",
      "category": 14
    },
    "available": true,
    "total_quantity": 3,
    "image": "https://res.cloudinary.com/dcqegufoe/image/upload/v1/media/assets/images/WhatsApp_Image_2026-02-26_at_3.03.44_PM",
    "image_url": "https://res.cloudinary.com/dcqegufoe/image/upload/media/assets/images/WhatsApp_Image_2026-02-26_at_3.03.44_pm",
    "status": "3 Units Available"
  },
  {
    "id": 19,
    "name": "Dji mic mini",
    "description": "Dji mic mini",
    "details": "Dji mic mini",
    "serial_number": "04",
    "location": {
      "id": 1,
      "name": "Bangalore",
      "description": "Bangalore"
    },
    "category": {
      "id": 15,
      "name": "Audio Equipment",
      "subcategories": [
        {
          "id": 18,
          "name": "DJI Mic Mini",
          "category": 15
        },
        {
          "id": 19,
          "name": "Audio-Technica AT2040 microphones",
          "category": 15
        },
        {
          "id": 20,
          "name": "Shure SM58 microphone",
          "category": 15
        },
        {
          "id": 21,
          "name": "presonus 10-channel audio mixer",
          "category": 15
        },
        {
          "id": 22,
          "name": "Podcast mic stands",
          "category": 15
        },
        {
          "id": 23,
          "name": "table podcast muc stand",
          "category": 15
        },
        {
          "id": 24,
          "name": "Mic stand",
          "category": 15
        },
        {
          "id": 32,
          "name": "Speakers 800w",
          "category": 15
        }
      ]
    },
    "subcategory": {
      "id": 18,
      "name": "DJI Mic Mini",
      "category": 15
    },
    "available": true,
    "total_quantity": 1,
    "image": "https://res.cloudinary.com/dcqegufoe/image/upload/v1/media/assets/images/WhatsApp_Image_2026-02-26_at_3.04.45_PM",
    "image_url": "https://res.cloudinary.com/dcqegufoe/image/upload/media/assets/images/WhatsApp_Image_2026-02-26_at_3.04.45_pm",
    "status": "1 Units Available"
  },
  {
    "id": 20,
    "name": "Battery",
    "description": "Battery",
    "details": "Battery",
    "serial_number": "05",
    "location": {
      "id": 1,
      "name": "Bangalore",
      "description": "Bangalore"
    },
    "category": {
      "id": 14,
      "name": "Camera & Power",
      "subcategories": [
        {
          "id": 13,
          "name": "Sony FX3 cameras",
          "category": 14
        },
        {
          "id": 14,
          "name": "Camera batteries",
          "category": 14
        },
        {
          "id": 15,
          "name": "Battery chargers",
          "category": 14
        },
        {
          "id": 16,
          "name": "50mm lens sony",
          "category": 14
        },
        {
          "id": 17,
          "name": "50mm gmaster lens",
          "category": 14
        }
      ]
    },
    "subcategory": {
      "id": 15,
      "name": "Battery chargers",
      "category": 14
    },
    "available": true,
    "total_quantity": 3,
    "image": "https://res.cloudinary.com/dcqegufoe/image/upload/v1/media/assets/images/WhatsApp_Image_2026-02-26_at_3.05.25_PM",
    "image_url": "https://res.cloudinary.com/dcqegufoe/image/upload/media/assets/images/WhatsApp_Image_2026-02-26_at_3.05.25_pm",
    "status": "3 Units Available"
  },
  {
    "id": 21,
    "name": "Battery charger",
    "description": "Battery charger",
    "details": "Battery charger",
    "serial_number": "06",
    "location": {
      "id": 1,
      "name": "Bangalore",
      "description": "Bangalore"
    },
    "category": {
      "id": 14,
      "name": "Camera & Power",
      "subcategories": [
        {
          "id": 13,
          "name": "Sony FX3 cameras",
          "category": 14
        },
        {
          "id": 14,
          "name": "Camera batteries",
          "category": 14
        },
        {
          "id": 15,
          "name": "Battery chargers",
          "category": 14
        },
        {
          "id": 16,
          "name": "50mm lens sony",
          "category": 14
        },
        {
          "id": 17,
          "name": "50mm gmaster lens",
          "category": 14
        }
      ]
    },
    "subcategory": {
      "id": 15,
      "name": "Battery chargers",
      "category": 14
    },
    "available": true,
    "total_quantity": 1,
    "image": "https://res.cloudinary.com/dcqegufoe/image/upload/v1/media/assets/images/WhatsApp_Image_2026-02-26_at_3.05.55_PM",
    "image_url": "https://res.cloudinary.com/dcqegufoe/image/upload/media/assets/images/WhatsApp_Image_2026-02-26_at_3.05.55_pm",
    "status": "1 Units Available"
  },
  {
    "id": 22,
    "name": "50mm sony lens",
    "description": "50mm sony lens",
    "details": "50mm sony lens",
    "serial_number": "07",
    "location": {
      "id": 1,
      "name": "Bangalore",
      "description": "Bangalore"
    },
    "category": {
      "id": 14,
      "name": "Camera & Power",
      "subcategories": [
        {
          "id": 13,
          "name": "Sony FX3 cameras",
          "category": 14
        },
        {
          "id": 14,
          "name": "Camera batteries",
          "category": 14
        },
        {
          "id": 15,
          "name": "Battery chargers",
          "category": 14
        },
        {
          "id": 16,
          "name": "50mm lens sony",
          "category": 14
        },
        {
          "id": 17,
          "name": "50mm gmaster lens",
          "category": 14
        }
      ]
    },
    "subcategory": {
      "id": 16,
      "name": "50mm lens sony",
      "category": 14
    },
    "available": true,
    "total_quantity": 1,
    "image": "https://res.cloudinary.com/dcqegufoe/image/upload/v1/media/assets/images/WhatsApp_Image_2026-02-26_at_3.07.17_PM",
    "image_url": "https://res.cloudinary.com/dcqegufoe/image/upload/media/assets/images/WhatsApp_Image_2026-02-26_at_3.07.17_pm",
    "status": "1 Units Available"
  },
  {
    "id": 23,
    "name": "28 50 sony lens",
    "description": "28 50 sony lens",
    "details": "28 50 sony lens",
    "serial_number": "08",
    "location": {
      "id": 1,
      "name": "Bangalore",
      "description": "Bangalore"
    },
    "category": {
      "id": 14,
      "name": "Camera & Power",
      "subcategories": [
        {
          "id": 13,
          "name": "Sony FX3 cameras",
          "category": 14
        },
        {
          "id": 14,
          "name": "Camera batteries",
          "category": 14
        },
        {
          "id": 15,
          "name": "Battery chargers",
          "category": 14
        },
        {
          "id": 16,
          "name": "50mm lens sony",
          "category": 14
        },
        {
          "id": 17,
          "name": "50mm gmaster lens",
          "category": 14
        }
      ]
    },
    "subcategory": {
      "id": 16,
      "name": "50mm lens sony",
      "category": 14
    },
    "available": true,
    "total_quantity": 2,
    "image": "https://res.cloudinary.com/dcqegufoe/image/upload/v1/media/assets/images/WhatsApp_Image_2026-02-26_at_3.07.53_PM",
    "image_url": "https://res.cloudinary.com/dcqegufoe/image/upload/media/assets/images/WhatsApp_Image_2026-02-26_at_3.07.53_pm",
    "status": "2 Units Available"
  },
  {
    "id": 24,
    "name": "Audio technica 2040 mic",
    "description": "Audio technica 2040 mic",
    "details": "Audio technica 2040 mic",
    "serial_number": "09",
    "location": {
      "id": 1,
      "name": "Bangalore",
      "description": "Bangalore"
    },
    "category": {
      "id": 15,
      "name": "Audio Equipment",
      "subcategories": [
        {
          "id": 18,
          "name": "DJI Mic Mini",
          "category": 15
        },
        {
          "id": 19,
          "name": "Audio-Technica AT2040 microphones",
          "category": 15
        },
        {
          "id": 20,
          "name": "Shure SM58 microphone",
          "category": 15
        },
        {
          "id": 21,
          "name": "presonus 10-channel audio mixer",
          "category": 15
        },
        {
          "id": 22,
          "name": "Podcast mic stands",
          "category": 15
        },
        {
          "id": 23,
          "name": "table podcast muc stand",
          "category": 15
        },
        {
          "id": 24,
          "name": "Mic stand",
          "category": 15
        },
        {
          "id": 32,
          "name": "Speakers 800w",
          "category": 15
        }
      ]
    },
    "subcategory": {
      "id": 19,
      "name": "Audio-Technica AT2040 microphones",
      "category": 15
    },
    "available": true,
    "total_quantity": 3,
    "image": "https://res.cloudinary.com/dcqegufoe/image/upload/v1/media/assets/images/WhatsApp_Image_2026-02-26_at_3.08.26_PM",
    "image_url": "https://res.cloudinary.com/dcqegufoe/image/upload/media/assets/images/WhatsApp_Image_2026-02-26_at_3.08.26_pm",
    "status": "3 Units Available"
  },
  {
    "id": 25,
    "name": "Podcast table mic stand",
    "description": "Podcast table mic stand",
    "details": "Podcast table mic stand",
    "serial_number": "10",
    "location": {
      "id": 1,
      "name": "Bangalore",
      "description": "Bangalore"
    },
    "category": {
      "id": 15,
      "name": "Audio Equipment",
      "subcategories": [
        {
          "id": 18,
          "name": "DJI Mic Mini",
          "category": 15
        },
        {
          "id": 19,
          "name": "Audio-Technica AT2040 microphones",
          "category": 15
        },
        {
          "id": 20,
          "name": "Shure SM58 microphone",
          "category": 15
        },
        {
          "id": 21,
          "name": "presonus 10-channel audio mixer",
          "category": 15
        },
        {
          "id": 22,
          "name": "Podcast mic stands",
          "category": 15
        },
        {
          "id": 23,
          "name": "table podcast muc stand",
          "category": 15
        },
        {
          "id": 24,
          "name": "Mic stand",
          "category": 15
        },
        {
          "id": 32,
          "name": "Speakers 800w",
          "category": 15
        }
      ]
    },
    "subcategory": {
      "id": 23,
      "name": "table podcast muc stand",
      "category": 15
    },
    "available": true,
    "total_quantity": 1,
    "image": "https://res.cloudinary.com/dcqegufoe/image/upload/v1/media/assets/images/WhatsApp_Image_2026-02-26_at_3.09.13_PM",
    "image_url": "https://res.cloudinary.com/dcqegufoe/image/upload/media/assets/images/WhatsApp_Image_2026-02-26_at_3.09.13_pm",
    "status": "1 Units Available"
  },
  {
    "id": 26,
    "name": "Podcast mic stand",
    "description": "Podcast mic stand",
    "details": "Podcast mic stand",
    "serial_number": "11",
    "location": {
      "id": 1,
      "name": "Bangalore",
      "description": "Bangalore"
    },
    "category": {
      "id": 15,
      "name": "Audio Equipment",
      "subcategories": [
        {
          "id": 18,
          "name": "DJI Mic Mini",
          "category": 15
        },
        {
          "id": 19,
          "name": "Audio-Technica AT2040 microphones",
          "category": 15
        },
        {
          "id": 20,
          "name": "Shure SM58 microphone",
          "category": 15
        },
        {
          "id": 21,
          "name": "presonus 10-channel audio mixer",
          "category": 15
        },
        {
          "id": 22,
          "name": "Podcast mic stands",
          "category": 15
        },
        {
          "id": 23,
          "name": "table podcast muc stand",
          "category": 15
        },
        {
          "id": 24,
          "name": "Mic stand",
          "category": 15
        },
        {
          "id": 32,
          "name": "Speakers 800w",
          "category": 15
        }
      ]
    },
    "subcategory": {
      "id": 22,
      "name": "Podcast mic stands",
      "category": 15
    },
    "available": true,
    "total_quantity": 3,
    "image": "https://res.cloudinary.com/dcqegufoe/image/upload/v1/media/assets/images/WhatsApp_Image_2026-02-26_at_3.10.54_PM_1",
    "image_url": "https://res.cloudinary.com/dcqegufoe/image/upload/media/assets/images/WhatsApp_Image_2026-02-26_at_3.10.54_pm_1",
    "status": "3 Units Available"
  },
  {
    "id": 27,
    "name": "Mic stand",
    "description": "Mic stand",
    "details": "Mic stand",
    "serial_number": "12",
    "location": {
      "id": 1,
      "name": "Bangalore",
      "description": "Bangalore"
    },
    "category": {
      "id": 15,
      "name": "Audio Equipment",
      "subcategories": [
        {
          "id": 18,
          "name": "DJI Mic Mini",
          "category": 15
        },
        {
          "id": 19,
          "name": "Audio-Technica AT2040 microphones",
          "category": 15
        },
        {
          "id": 20,
          "name": "Shure SM58 microphone",
          "category": 15
        },
        {
          "id": 21,
          "name": "presonus 10-channel audio mixer",
          "category": 15
        },
        {
          "id": 22,
          "name": "Podcast mic stands",
          "category": 15
        },
        {
          "id": 23,
          "name": "table podcast muc stand",
          "category": 15
        },
        {
          "id": 24,
          "name": "Mic stand",
          "category": 15
        },
        {
          "id": 32,
          "name": "Speakers 800w",
          "category": 15
        }
      ]
    },
    "subcategory": {
      "id": 24,
      "name": "Mic stand",
      "category": 15
    },
    "available": true,
    "total_quantity": 1,
    "image": "https://res.cloudinary.com/dcqegufoe/image/upload/v1/media/assets/images/WhatsApp_Image_2026-02-26_at_3.11.08_PM",
    "image_url": "https://res.cloudinary.com/dcqegufoe/image/upload/media/assets/images/WhatsApp_Image_2026-02-26_at_3.11.08_pm",
    "status": "1 Units Available"
  },
  {
    "id": 28,
    "name": "Shure sm 58 mic",
    "description": "Shure sm 58 mic",
    "details": "Shure sm 58 mic",
    "serial_number": "13",
    "location": {
      "id": 1,
      "name": "Bangalore",
      "description": "Bangalore"
    },
    "category": {
      "id": 15,
      "name": "Audio Equipment",
      "subcategories": [
        {
          "id": 18,
          "name": "DJI Mic Mini",
          "category": 15
        },
        {
          "id": 19,
          "name": "Audio-Technica AT2040 microphones",
          "category": 15
        },
        {
          "id": 20,
          "name": "Shure SM58 microphone",
          "category": 15
        },
        {
          "id": 21,
          "name": "presonus 10-channel audio mixer",
          "category": 15
        },
        {
          "id": 22,
          "name": "Podcast mic stands",
          "category": 15
        },
        {
          "id": 23,
          "name": "table podcast muc stand",
          "category": 15
        },
        {
          "id": 24,
          "name": "Mic stand",
          "category": 15
        },
        {
          "id": 32,
          "name": "Speakers 800w",
          "category": 15
        }
      ]
    },
    "subcategory": {
      "id": 20,
      "name": "Shure SM58 microphone",
      "category": 15
    },
    "available": true,
    "total_quantity": 1,
    "image": "https://res.cloudinary.com/dcqegufoe/image/upload/v1/media/assets/images/WhatsApp_Image_2026-02-26_at_3.12.29_PM",
    "image_url": "https://res.cloudinary.com/dcqegufoe/image/upload/media/assets/images/WhatsApp_Image_2026-02-26_at_3.12.29_pm",
    "status": "1 Units Available"
  },
  {
    "id": 33,
    "name": "Camera",
    "description": "dgddf",
    "details": "sdfrddf",
    "serial_number": "001",
    "location": {
      "id": 1,
      "name": "Bangalore",
      "description": "Bangalore"
    },
    "category": {
      "id": 14,
      "name": "Camera & Power",
      "subcategories": [
        {
          "id": 13,
          "name": "Sony FX3 cameras",
          "category": 14
        },
        {
          "id": 14,
          "name": "Camera batteries",
          "category": 14
        },
        {
          "id": 15,
          "name": "Battery chargers",
          "category": 14
        },
        {
          "id": 16,
          "name": "50mm lens sony",
          "category": 14
        },
        {
          "id": 17,
          "name": "50mm gmaster lens",
          "category": 14
        }
      ]
    },
    "subcategory": {
      "id": 16,
      "name": "50mm lens sony",
      "category": 14
    },
    "available": true,
    "total_quantity": 2,
    "image": "https://res.cloudinary.com/dcqegufoe/image/upload/v1/media/assets/images/Camera_1",
    "image_url": "https://res.cloudinary.com/dcqegufoe/image/upload/media/assets/images/Camera_1.jpg",
    "status": "2 Units Available"
  },
  {
    "id": 34,
    "name": "Camera",
    "description": "tdegtff",
    "details": "edfrde",
    "serial_number": "0004",
    "location": {
      "id": 1,
      "name": "Bangalore",
      "description": "Bangalore"
    },
    "category": {
      "id": 14,
      "name": "Camera & Power",
      "subcategories": [
        {
          "id": 13,
          "name": "Sony FX3 cameras",
          "category": 14
        },
        {
          "id": 14,
          "name": "Camera batteries",
          "category": 14
        },
        {
          "id": 15,
          "name": "Battery chargers",
          "category": 14
        },
        {
          "id": 16,
          "name": "50mm lens sony",
          "category": 14
        },
        {
          "id": 17,
          "name": "50mm gmaster lens",
          "category": 14
        }
      ]
    },
    "subcategory": {
      "id": 17,
      "name": "50mm gmaster lens",
      "category": 14
    },
    "available": true,
    "total_quantity": 2,
    "image": "https://res.cloudinary.com/dcqegufoe/image/upload/v1/media/assets/images/WhatsApp_Image_2026-02-26_at_3.08.26_PM_o7ihvx",
    "image_url": "https://res.cloudinary.com/dcqegufoe/image/upload/media/assets/images/WhatsApp_Image_2026-02-26_at_3.08.26_pm_o7ihvx",
    "status": "2 Units Available"
  },
  {
    "id": 35,
    "name": "Camera",
    "description": "tdegtff",
    "details": "edfrde",
    "serial_number": "0004",
    "location": {
      "id": 1,
      "name": "Bangalore",
      "description": "Bangalore"
    },
    "category": {
      "id": 14,
      "name": "Camera & Power",
      "subcategories": [
        {
          "id": 13,
          "name": "Sony FX3 cameras",
          "category": 14
        },
        {
          "id": 14,
          "name": "Camera batteries",
          "category": 14
        },
        {
          "id": 15,
          "name": "Battery chargers",
          "category": 14
        },
        {
          "id": 16,
          "name": "50mm lens sony",
          "category": 14
        },
        {
          "id": 17,
          "name": "50mm gmaster lens",
          "category": 14
        }
      ]
    },
    "subcategory": {
      "id": 17,
      "name": "50mm gmaster lens",
      "category": 14
    },
    "available": true,
    "total_quantity": 2,
    "image": "https://res.cloudinary.com/dcqegufoe/image/upload/v1/media/assets/images/WhatsApp_Image_2026-02-26_at_3.08.26_PM_sjwduy",
    "image_url": "https://res.cloudinary.com/dcqegufoe/image/upload/media/assets/images/WhatsApp_Image_2026-02-26_at_3.08.26_pm_sjwduy",
    "status": "2 Units Available"
  },
  {
    "id": 36,
    "name": "Camera",
    "description": "tdegtff",
    "details": "edfrde",
    "serial_number": "0004",
    "location": {
      "id": 1,
      "name": "Bangalore",
      "description": "Bangalore"
    },
    "category": {
      "id": 14,
      "name": "Camera & Power",
      "subcategories": [
        {
          "id": 13,
          "name": "Sony FX3 cameras",
          "category": 14
        },
        {
          "id": 14,
          "name": "Camera batteries",
          "category": 14
        },
        {
          "id": 15,
          "name": "Battery chargers",
          "category": 14
        },
        {
          "id": 16,
          "name": "50mm lens sony",
          "category": 14
        },
        {
          "id": 17,
          "name": "50mm gmaster lens",
          "category": 14
        }
      ]
    },
    "subcategory": {
      "id": 17,
      "name": "50mm gmaster lens",
      "category": 14
    },
    "available": true,
    "total_quantity": 2,
    "image": "https://res.cloudinary.com/dcqegufoe/image/upload/v1/media/assets/images/WhatsApp_Image_2026-02-26_at_3.08.26_PM_d1slaa",
    "image_url": "https://res.cloudinary.com/dcqegufoe/image/upload/media/assets/images/WhatsApp_Image_2026-02-26_at_3.08.26_pm_d1slaa",
    "status": "2 Units Available"
  },
  {
    "id": 37,
    "name": "Camera 1",
    "description": "drftedede",
    "details": "dddfdd",
    "serial_number": "0005",
    "location": {
      "id": 1,
      "name": "Bangalore",
      "description": "Bangalore"
    },
    "category": {
      "id": 14,
      "name": "Camera & Power",
      "subcategories": [
        {
          "id": 13,
          "name": "Sony FX3 cameras",
          "category": 14
        },
        {
          "id": 14,
          "name": "Camera batteries",
          "category": 14
        },
        {
          "id": 15,
          "name": "Battery chargers",
          "category": 14
        },
        {
          "id": 16,
          "name": "50mm lens sony",
          "category": 14
        },
        {
          "id": 17,
          "name": "50mm gmaster lens",
          "category": 14
        }
      ]
    },
    "subcategory": {
      "id": 17,
      "name": "50mm gmaster lens",
      "category": 14
    },
    "available": true,
    "total_quantity": 2,
    "image": "https://res.cloudinary.com/dcqegufoe/image/upload/v1/media/assets/images/WhatsApp_Image_2026-02-26_at_3.05.55_PM_kpqmpb",
    "image_url": "https://res.cloudinary.com/dcqegufoe/image/upload/media/assets/images/WhatsApp_Image_2026-02-26_at_3.05.55_pm_kpqmpb",
    "status": "2 Units Available"
  },
  {
    "id": 38,
    "name": "Battery",
    "description": "dftrrfvv",
    "details": "frtgddf",
    "serial_number": "0006",
    "location": {
      "id": 1,
      "name": "Bangalore",
      "description": "Bangalore"
    },
    "category": {
      "id": 14,
      "name": "Camera & Power",
      "subcategories": [
        {
          "id": 13,
          "name": "Sony FX3 cameras",
          "category": 14
        },
        {
          "id": 14,
          "name": "Camera batteries",
          "category": 14
        },
        {
          "id": 15,
          "name": "Battery chargers",
          "category": 14
        },
        {
          "id": 16,
          "name": "50mm lens sony",
          "category": 14
        },
        {
          "id": 17,
          "name": "50mm gmaster lens",
          "category": 14
        }
      ]
    },
    "subcategory": {
      "id": 15,
      "name": "Battery chargers",
      "category": 14
    },
    "available": true,
    "total_quantity": 2,
    "image": "https://res.cloudinary.com/dcqegufoe/image/upload/v1/media/assets/images/WhatsApp_Image_2026-02-26_at_3.05.25_PM_xblgrp",
    "image_url": "https://res.cloudinary.com/dcqegufoe/image/upload/media/assets/images/WhatsApp_Image_2026-02-26_at_3.05.25_pm_xblgrp",
    "status": "2 Units Available"
  }
];
