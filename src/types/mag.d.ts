declare module "Mag" {
  interface MagOptions {
    theme?: "dark" | "light";
    density?: number;
    particlesScale?: number;
    ringWidth?: number;
    ringWidth2?: number;
    ringDisplacement?: number;
    interactive?: boolean;
  }

  interface MagInstance {
    destroy(): void;
  }

  export class Mag {
    static init(
      selectorOrElement: string | HTMLElement,
      options?: MagOptions
    ): MagInstance | null;
  }
}
