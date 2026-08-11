import logoSrc from "../../assets/logo/subnet-logo.png";

/**
 * Reusable SUBNET brand mark.
 * The source asset is already cropped to the visible logo, so the browser can
 * render it as a normal image without background-position or crop math.
 */
function Logo({ height = 48, className = "" }) {
  return (
    <img
      src={logoSrc}
      alt="SUBNET"
      style={{ height: `${height}px`, width: "auto" }}
      className={`block shrink-0 object-contain ${className}`}
    />
  );
}

export default Logo;
