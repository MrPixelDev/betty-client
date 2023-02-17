import { makeAutoObservable } from "mobx";

type VariantType = "default" | "error" | "success" | "warning" | "info";

export default class SnackStore {
  snackMessage = "";
  variant: VariantType = "default";

  // TODO: MobX MakeAutoObservable, MakeObservable obsidian
  constructor() {
    makeAutoObservable(this);
  }

  setSnackMessage(msg: string): void {
    this.snackMessage = msg;
  }

  setSnackVariant(variant: VariantType): void {
    this.variant = variant;
  }

  removeSnack(): void {
    this.variant = "default";
    this.snackMessage = "";
  }
}
