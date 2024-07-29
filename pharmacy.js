export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  canExpire() {
    return !["Herbal Tea", "Fervex", "Magic Pill"].includes(this.name);
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    this.drugs = this.drugs.map(currentDrug => {
      // Decrease benefit for common drugs
      if (currentDrug.canExpire() && currentDrug.benefit > 0) {
        currentDrug.benefit = currentDrug.benefit - 1;
      }
      if (
        ["Herbal Tea", "Fervex"].includes(currentDrug.name) &&
        currentDrug.benefit < 50
      ) {
        currentDrug.benefit = currentDrug.benefit + 1;
        if (currentDrug.name == "Fervex") {
          if (currentDrug.expiresIn < 11 && currentDrug.benefit < 50) {
            currentDrug.benefit = currentDrug.benefit + 1;
          }
          if (currentDrug.expiresIn < 6 && currentDrug.benefit < 50) {
            currentDrug.benefit = currentDrug.benefit + 1;
          }
        }
      }

      // Decrease expiresIn except for Magic pill
      if (currentDrug.name != "Magic Pill") {
        currentDrug.expiresIn = currentDrug.expiresIn - 1;
      }

      // reset benefits when expired reached
      if (currentDrug.expiresIn < 0) {
        if (currentDrug.name != "Herbal Tea") {
          if (currentDrug.name != "Fervex") {
            if (currentDrug.benefit > 0 && currentDrug.name != "Magic Pill") {
              currentDrug.benefit = currentDrug.benefit - 1;
            }
          } else {
            currentDrug.benefit = 0;
          }
        } else if (currentDrug.benefit < 50) {
          currentDrug.benefit = currentDrug.benefit + 1;
        }
      }
      return currentDrug;
    });

    return this.drugs;
  }
}
