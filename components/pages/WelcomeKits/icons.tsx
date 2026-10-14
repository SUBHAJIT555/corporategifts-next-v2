import type { ReactNode } from "react";

type IconProps = {
  size?: number;
};

function Icon({ size = 20, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      {children}
    </svg>
  );
}

export function GiftIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M3 8m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z" />
      <path d="M12 8l0 13" />
      <path d="M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5a4.8 8 0 0 1 4.5 -5a2.5 2.5 0 0 1 0 5" />
    </Icon>
  );
}

export function BrushIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M3 21v-4a4 4 0 1 1 4 4h-4" />
      <path d="M21 3a16 16 0 0 0 -12.8 10.2" />
      <path d="M21 3a16 16 0 0 1 -10.2 12.8" />
      <path d="M10.6 9a9 9 0 0 1 4.4 4.4" />
    </Icon>
  );
}

export function PackagesIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M7 16.5l-5 -3l5 -3l5 3v5.5l-5 3z" />
      <path d="M2 13.5v5.5l5 3" />
      <path d="M7 16.545l5 -3.03" />
      <path d="M17 16.5l-5 -3l5 -3l5 3v5.5l-5 3z" />
      <path d="M12 19l5 3" />
      <path d="M17 16.5l5 -3" />
      <path d="M12 13.5v-5.5l-5 -3l5 -3l5 3v5.5" />
      <path d="M7 5.03v5.455" />
      <path d="M12 8l5 -3" />
    </Icon>
  );
}

export function MapPinIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
      <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
    </Icon>
  );
}

export function ClockIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
      <path d="M12 7v5l3 3" />
    </Icon>
  );
}

export function UsersIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
    </Icon>
  );
}

export function BriefcaseIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
      <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
      <path d="M12 12l0 .01" />
      <path d="M3 13a20 20 0 0 0 18 0" />
    </Icon>
  );
}

export function LeafIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M5 21c.5 -4.5 2.5 -8 7 -10" />
      <path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3z" />
    </Icon>
  );
}

export function PackageIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
      <path d="M12 12l8 -4.5" />
      <path d="M12 12l0 9" />
      <path d="M12 12l-8 -4.5" />
      <path d="M16 5.25l-8 4.5" />
    </Icon>
  );
}

export function BoltIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" />
    </Icon>
  );
}

export function BuildingIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M3 21l18 0" />
      <path d="M5 21v-14l8 -4v18" />
      <path d="M19 21v-10l-6 -4" />
      <path d="M9 9l0 .01" />
      <path d="M9 12l0 .01" />
      <path d="M9 15l0 .01" />
      <path d="M9 18l0 .01" />
    </Icon>
  );
}

export function StarIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
    </Icon>
  );
}

export function HelpIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M12 17l0 .01" />
      <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
    </Icon>
  );
}

export function NotebookIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />
      <path d="M13 8l2 0" />
      <path d="M13 12l2 0" />
    </Icon>
  );
}

export function PencilIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
      <path d="M13.5 6.5l4 4" />
    </Icon>
  );
}

export function BottleIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M10 5h4v-2a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v2z" />
      <path d="M14 3.5c0 1.626 .507 3.212 1.45 4.537l.05 .07a8.093 8.093 0 0 1 1.5 4.694v6.199a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2v-6.2c0 -1.682 .524 -3.322 1.5 -4.693l.05 -.07a7.823 7.823 0 0 0 1.45 -4.537" />
      <path d="M7 14.803a2.4 2.4 0 0 0 1 -.803a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 1 -.805" />
    </Icon>
  );
}

export function MugIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M4.083 5h10.834a1.08 1.08 0 0 1 1.083 1.077v8.615c0 2.38 -1.94 4.308 -4.333 4.308h-4.334c-2.393 0 -4.333 -1.929 -4.333 -4.308v-8.615a1.08 1.08 0 0 1 1.083 -1.077" />
      <path d="M16 8h2.5c1.38 0 2.5 1.045 2.5 2.333v2.334c0 1.288 -1.12 2.333 -2.5 2.333h-2.5" />
    </Icon>
  );
}

export function BatteryIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M6 7h11a2 2 0 0 1 2 2v.5a.5 .5 0 0 0 .5 .5a.5 .5 0 0 1 .5 .5v3a.5 .5 0 0 1 -.5 .5a.5 .5 0 0 0 -.5 .5v.5a2 2 0 0 1 -2 2h-11a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2" />
      <path d="M7 10l0 4" />
      <path d="M10 10l0 4" />
      <path d="M13 10l0 4" />
      <path d="M16 10l0 4" />
    </Icon>
  );
}

export function IdIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M3 4m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
      <path d="M9 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M15 8l2 0" />
      <path d="M15 12l2 0" />
      <path d="M7 16l10 0" />
    </Icon>
  );
}

export function MailIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
      <path d="M3 7l9 6l9 -6" />
    </Icon>
  );
}

export function ChevronIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M6 9l6 6l6 -6" />
    </Icon>
  );
}
