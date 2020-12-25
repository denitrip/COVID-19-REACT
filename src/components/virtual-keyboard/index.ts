import "./style.scss";

import en from "../../assets/audio/en.mp3";

interface Symbols {
  RUS: string[];
  RUS_SHIFT: string[];
  EN: string[];
  EN_SHIFT: string[];
  CODE: string[];
}

export class Keyboard {
  keyboard = document.createElement("div") as HTMLDivElement;
  textarea: HTMLInputElement;
  capsLock: boolean = true;
  language: boolean =
    localStorage.getItem("language") === "false" ? false : true;
  shift: boolean = false;
  sound: boolean = localStorage.getItem("sound") === "false" ? false : true;
  active: boolean = false;
  voice: boolean = true;
  symbol: Symbols;
  recognition: any;
  isActive: boolean;
  setValue: any;

  constructor(
    state: Symbols,
    input: HTMLInputElement,
    value: boolean,
    setValue: any
  ) {
    this.symbol = state;
    this.textarea = input;
    this.isActive = value;
    this.setValue = setValue;
  }
  render = () => {
    this.keyboard.classList.add("keyboard");
    this.keyboard.append(this.createKeys());

    return this.keyboard;
  };

  createIconHTML = (icon_name: string) => {
    return `<i class="material-icons">${icon_name}</i>`;
  };

  createKeys = () => {
    const fragment = document.createDocumentFragment();

    this.symbol.CODE.forEach((key: string, i: number) => {
      const keyElement = document.createElement("button") as HTMLButtonElement;
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");
      keyElement.setAttribute("data-code", key);
      const languageKey = this.language
        ? this.symbol.EN[i]
        : this.symbol.RUS[i];
      switch (key) {
        case "Backspace":
          keyElement.classList.add("keyboard__key--backspace");
          keyElement.textContent = languageKey;
          keyElement.addEventListener("click", () => {
            if (this.textarea.value.length > 0) {
              this.textarea.setRangeText(
                "",
                this.textarea.selectionStart - 1,
                this.textarea.selectionStart,
                "select"
              );
            }
            this.setValue(this.textarea.value);
            this.textarea.focus();
            this.playAudio();
          });
          break;
        case "Tab":
          keyElement.classList.add("keyboard__key--tab");
          keyElement.textContent = languageKey;
          keyElement.addEventListener("click", () => {
            this.textarea.setRangeText(
              "\t",
              this.textarea.selectionStart,
              this.textarea.selectionEnd,
              "end"
            );
            this.setValue(this.textarea.value);
            this.textarea.focus();
            this.playAudio();
          });
          break;
        case "Delete":
          keyElement.classList.add("keyboard__key--del");
          keyElement.textContent = languageKey;
          keyElement.addEventListener("click", () => {
            this.textarea.setRangeText(
              "",
              this.textarea.selectionStart,
              this.textarea.selectionStart + 1,
              "select"
            );
            this.setValue(this.textarea.value);
            this.textarea.focus();
            this.playAudio();
          });
          break;
        case "CapsLock":
          keyElement.classList.add("keyboard__key--capsLock");
          keyElement.textContent = languageKey;
          keyElement.addEventListener("click", (e: any) => {
            this.pressCaps();
            e.target.classList.toggle("press");
            e.target.classList.toggle("keyboard__key--capsLock_active");
            this.playAudio();
          });
          break;
        case "Enter":
          keyElement.classList.add("keyboard__key--enter");
          keyElement.textContent = languageKey;
          keyElement.addEventListener("click", () => {
            this.textarea.setRangeText(
              "\n",
              this.textarea.selectionStart,
              this.textarea.selectionStart,
              "end"
            );
            this.setValue(this.textarea.value);
            this.textarea.focus();
            this.playAudio();
          });
          break;
        case "ShiftLeft":
          keyElement.classList.add("keyboard__key--shiftLeft");
          keyElement.textContent = languageKey;
          keyElement.addEventListener("click", (e: any) => {
            this.shift = !this.shift;
            e.target.classList.toggle("keyboard__key--active_shift");
            e.target.classList.toggle("press");
            this.changeLanguageAndShift();
            this.playAudio();
          });
          break;
        case "ShiftRight":
          keyElement.classList.add("keyboard__key--shiftRight");
          keyElement.textContent = languageKey;
          keyElement.addEventListener("click", (e: any) => {
            this.shift = !this.shift;
            e.target.classList.toggle("keyboard__key--active_shift");
            e.target.classList.toggle("press");
            this.changeLanguageAndShift();
            this.playAudio();
          });
          break;
        case "ControlLeft":
          keyElement.classList.add("keyboard__key--controlLeft");
          keyElement.textContent = languageKey;
          keyElement.addEventListener("click", (e: any) => {
            this.playAudio();
          });
          break;
        case "ControlRight":
          keyElement.classList.add("keyboard__key--controlRight");
          keyElement.textContent = languageKey;
          keyElement.addEventListener("click", () => {
            this.playAudio();
          });
          break;
        case "AltLeft":
          keyElement.classList.add("keyboard__key--alt");
          keyElement.innerHTML = this.createIconHTML("keyboard_voice");
          break;
        case "AltRight":
          keyElement.innerHTML = this.createIconHTML(
            `${this.sound ? "volume_up" : "volume_off"}`
          );
          keyElement.addEventListener("click", () => {
            this.playAudio();
            this.sound = !this.sound;
            keyElement.innerHTML = this.createIconHTML(
              `${this.sound ? "volume_up" : "volume_off"}`
            );
            localStorage.setItem("sound", String(this.sound));
          });
          break;
        case "Space":
          keyElement.classList.add("keyboard__key--space");
          keyElement.textContent = languageKey;
          keyElement.addEventListener("click", () => {
            this.textarea.setRangeText(
              " ",
              this.textarea.selectionStart,
              this.textarea.selectionStart,
              "end"
            );
            this.setValue(this.textarea.value);
            this.textarea.focus();
            this.playAudio();
          });
          break;
        case "ArrowUp":
          keyElement.classList.add("keyboard__key--arrow");
          keyElement.innerHTML = languageKey;
          keyElement.addEventListener("click", () => {
            this.playAudio();
          });
          break;
        case "ArrowDown":
          keyElement.classList.add("keyboard__key--arrow");
          keyElement.innerHTML = languageKey;
          keyElement.addEventListener("click", () => {
            this.playAudio();
          });
          break;
        case "ArrowLeft":
          keyElement.classList.add("keyboard__key--arrow");
          keyElement.innerHTML = languageKey;
          keyElement.addEventListener("click", () => {
            this.textarea.selectionEnd -= 1;
            this.textarea.focus();
            this.playAudio();
          });
          break;
        case "ArrowRight":
          keyElement.classList.add("keyboard__key--arrow");
          keyElement.innerHTML = languageKey;
          keyElement.addEventListener("click", () => {
            this.textarea.selectionStart += 1;
            this.textarea.focus();
            this.playAudio();
          });
          break;
        case "MetaLeft":
          keyElement.textContent = this.language ? "EN" : "RU";
          keyElement.addEventListener("click", (e: any) => {
            this.language = !this.language;
            e.target.textContent = this.language ? "EN" : "RU";
            this.changeLanguageAndShift();
            this.playAudio();
            localStorage.setItem("language", String(this.language));
          });
          break;
        default:
          keyElement.classList.add("standard");
          keyElement.textContent = languageKey;
          keyElement.addEventListener("click", (e: any) => {
            this.textarea.focus();
            this.textarea.setRangeText(
              e.target.textContent,
              this.textarea.selectionStart,
              this.textarea.selectionEnd,
              "end"
            );
            this.setValue(this.textarea.value);
            this.textarea.focus();
            this.playAudio();
          });
      }
      fragment.appendChild(keyElement);
    });
    return fragment;
  };

  pressCaps = () => {
    this.capsLock = !this.capsLock;
    const caps = document.querySelectorAll(".standard") as NodeListOf<Element>;
    caps.forEach((key: any) => {
      key.textContent =
        !this.capsLock && !this.shift
          ? key.textContent?.toUpperCase()
          : !this.capsLock && this.shift
          ? key.textContent?.toLowerCase()
          : this.capsLock && this.shift
          ? key.textContent?.toUpperCase()
          : key.textContent?.toLowerCase();
    });
  };

  changeLanguageAndShift = () => {
    const keys = document.querySelectorAll(
      ".keyboard__key"
    ) as NodeListOf<Element>;
    keys.forEach((key, i: number) => {
      if (key.className === "keyboard__key standard" && this.language) {
        key.textContent =
          this.shift && this.capsLock
            ? this.symbol.EN_SHIFT[i]
            : this.shift && !this.capsLock
            ? this.symbol.EN_SHIFT[i].toLowerCase()
            : !this.shift && !this.capsLock
            ? this.symbol.EN[i].toUpperCase()
            : this.symbol.EN[i];
      }
      if (key.className === "keyboard__key standard" && !this.language) {
        key.textContent =
          this.shift && this.capsLock
            ? this.symbol.RUS_SHIFT[i]
            : this.shift && !this.capsLock
            ? this.symbol.RUS_SHIFT[i].toLowerCase()
            : !this.shift && !this.capsLock
            ? this.symbol.RUS[i].toUpperCase()
            : this.symbol.RUS[i];
      }
    });
  };

  playAudio = () => {
    if (this.sound) {
      const myAudio = new Audio(en);
      myAudio.play();
    }
  };
}
