import React from "react";
import {
  IconBrandFacebook,
  IconBrandWhatsapp,
  IconBrandGoogle,
  IconBrandInstagram,
  IconMail,
  IconStar,
  IconPawFilled,
} from "@tabler/icons-react";

export const medioIcons: Record<string, React.ReactNode> = {
  Facebook: <IconBrandFacebook className="h-4 w-4" />,
  Whatsapp: <IconBrandWhatsapp className="h-4 w-4" />,
  Google: <IconBrandGoogle className="h-4 w-4" />,
  Instagram: <IconBrandInstagram className="h-4 w-4" />,
  "Post Venta": <IconMail className="h-4 w-4" />,
  Recomendacion: <IconStar className="h-4 w-4" />,
  Logos: <IconPawFilled className="h-4 w-4" />,
};
