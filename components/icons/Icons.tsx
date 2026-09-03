import type { ReactNode } from "react";

type IconProps = { className?: string };

const base = "h-12 w-12 text-gold sm:h-14 sm:w-14";

function Icon({ className = base, children }: IconProps & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      {children}
    </svg>
  );
}

export function AmenityIcon1({ className = base }: IconProps) {
  return (
    <Icon className={className}>
      <ellipse cx="32" cy="40" rx="20" ry="8" />
      <path d="M16 40 Q32 28 48 40" />
    </Icon>
  );
}

export function AmenityIcon2({ className = base }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M12 44 Q24 32 32 44 T52 44" />
      <circle cx="20" cy="36" r="3" fill="currentColor" />
      <circle cx="44" cy="32" r="3" fill="currentColor" />
    </Icon>
  );
}

export function AmenityIcon3({ className = base }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="14" y="24" width="36" height="24" />
      <line x1="14" y1="32" x2="50" y2="32" />
    </Icon>
  );
}

export function AmenityIcon4({ className = base }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M32 12 L48 44 H16 Z" fill="none" />
      <line x1="32" y1="12" x2="32" y2="44" />
    </Icon>
  );
}

export function AmenityIcon5({ className = base }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M32 8 L36 16 L44 16 L38 22 L40 30 L32 26 L24 30 L26 22 L20 16 L28 16 Z" />
    </Icon>
  );
}

export function AmenityIcon6({ className = base }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="32" cy="32" r="16" />
      <path d="M32 16 V48 M16 32 H48" />
    </Icon>
  );
}

export function AmenityIcon7({ className = base }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="20" y="28" width="24" height="16" />
      <path d="M24 28 V20 H40 V28" />
    </Icon>
  );
}

export function AmenityIcon8({ className = base }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="18" y="20" width="28" height="28" />
      <line x1="18" y1="34" x2="46" y2="34" />
      <line x1="32" y1="20" x2="32" y2="48" />
    </Icon>
  );
}

export const amenityIcons = [
  AmenityIcon1,
  AmenityIcon2,
  AmenityIcon3,
  AmenityIcon4,
  AmenityIcon5,
  AmenityIcon6,
  AmenityIcon7,
  AmenityIcon8,
];

export function ProximityIcon1({ className = base }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="16" y="20" width="32" height="24" />
      <path d="M24 20 V12 H40 V20" />
    </Icon>
  );
}

export function ProximityIcon2({ className = base }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="32" cy="36" r="12" />
      <path d="M32 12 V24" />
    </Icon>
  );
}

export function ProximityIcon3({ className = base }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M16 44 L24 20 L40 20 L48 44 Z" />
      <line x1="32" y1="20" x2="32" y2="44" />
    </Icon>
  );
}

export function ProximityIcon4({ className = base }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="32" cy="32" r="14" />
      <circle cx="32" cy="32" r="4" fill="currentColor" />
    </Icon>
  );
}

export function ProximityIcon5({ className = base }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M12 44 H52 M20 44 V28 H44 V44" />
      <path d="M32 12 L44 28 H20 Z" />
    </Icon>
  );
}

export const proximityIcons = [
  ProximityIcon1,
  ProximityIcon2,
  ProximityIcon3,
  ProximityIcon4,
  ProximityIcon5,
];

export function CommunityWellnessIcon({ className = base }: IconProps) {
  return <AmenityIcon1 className={className} />;
}

export function CommunityFamilyIcon({ className = base }: IconProps) {
  return <AmenityIcon7 className={className} />;
}

export function CommunitySecurityIcon({ className = base }: IconProps) {
  return <AmenityIcon5 className={className} />;
}

export const communityIcons = [
  CommunityWellnessIcon,
  CommunityFamilyIcon,
  CommunitySecurityIcon,
];
