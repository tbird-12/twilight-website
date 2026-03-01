export interface InsuranceProvider {
  name: string;
  fileName: string;
}

export const insuranceProviders: InsuranceProvider[] = [
  { name: "Aetna", fileName: "aetna.png" },
  { name: "Aetna Better Health", fileName: "aetna-better-health.png" },
  { name: "Aetna Medicare", fileName: "aetna-medicare.png" },
  { name: "Ambetter", fileName: "ambetter.png" },
  { name: "Cigna", fileName: "cigna.png" },
  { name: "CHAMPVA", fileName: "champva.png" },
  { name: "Humana", fileName: "humana.png" },
  { name: "Humana Healthy Horizons", fileName: "humana-healthy.png" },
  { name: "Kentucky State Medicaid", fileName: "medicaid.png" },
  { name: "Medicare", fileName: "medicare.png" },
  { name: "Passport by Molina", fileName: "passport.png" },
  { name: "UMR", fileName: "umr.png" },
  { name: "UnitedHealthcare (UHC)", fileName: "uhc.png" },
  { name: "UnitedHealthcare Community", fileName: "uhc-community.png" },
  { name: "Tricare East", fileName: "tricare.png" }
];
