import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <Image
        alt="Nami Network"
        src="/logo.png"
        width={128}
        height={32}
        className="w-auto h-[32px] object-contain rounded-xl"
        priority
      />
    ),
  },
  links: [
    { text: "ホーム", url: "/" },
    { text: "お知らせ", url: "https://discord.gg/cd33Z4ts3U" },
    { text: "ルール", url: "/docs/rules/terms" },
    { text: "Wiki", url: "/docs/wiki/getting-started" },
    { text: "マップ", url: "https://earthmap.naminetwork.jp/" },
    { text: "Discord", url: "https://discord.gg/cd33Z4ts3U" }
  ]
};
