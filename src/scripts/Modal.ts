import MicroModal from "micromodal";

declare const mapAreasInfo: any;

export class Modal {
  private selectors = {
    appContainer: "[data-map-app]",
    button: "[data-map-button]",
    path: "[data-area]",
  };

  private buttons: HTMLElement[] = [];
  private pathes: HTMLElement[] = [];
  private appContainer: HTMLElement | null;

  constructor() {
    this.buttons = Array.from(document.querySelectorAll(this.selectors.button)) || [];
    this.pathes = Array.from(document.querySelectorAll(this.selectors.path)) || [];
    this.appContainer = document.querySelector(this.selectors.appContainer);

    if (this.buttons.length > 0 && this.appContainer) this.bindEvents();
    console.log("Map modal - init");
  }

  private onButtonClick = (e: Event) => {
    const target = e.currentTarget as HTMLElement;
    if (!target) return;
    if (mapAreasInfo.length === 0) return;
    const id = target.dataset.mapButton;
    const currentItem = mapAreasInfo.find((el: any) => el.id === id);
    if (!currentItem) return;
    this.render(currentItem);
  };

  private onPathClick = (e: Event) => {
    const target = e.currentTarget as HTMLElement;
    if (!target) return;
    const pathId = Array.from(target.classList)[0]?.slice(5);
    console.log(Array.from(target.classList));
    if (!pathId) return;
    const current = mapAreasInfo.find((el: any) => el.id.toLowerCase() === pathId.toLowerCase());
    if (!current) return;
    this.render(current);
  };

  private render(data: any) {
    console.log("rendered");
    this.appContainer!.innerHTML = `
        <h2 class="modal__map-title">${data.title}</h2>
          <div class="modal__map-desc">
            <a href="${data.location.link}" target="_blank" class="modal__map-item">
              <span class="modal__map-item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M18.25 11C18.25 15 12 19.25 12 19.25C12 19.25 5.75 15 5.75 11C5.75 7.5 8.68629 4.75 12 4.75C15.3137 4.75 18.25 7.5 18.25 11Z" stroke="#404040" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14.25 11C14.25 12.2426 13.2426 13.25 12 13.25C10.7574 13.25 9.75 12.2426 9.75 11C9.75 9.75736 10.7574 8.75 12 8.75C13.2426 8.75 14.25 9.75736 14.25 11Z" stroke="#404040" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg></span>
              <p class="modal__map-item-text">${data.location.label}</p>
            </a>
               <a href="${data.phone.link}" class="modal__map-item">
              <span class="modal__map-item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M8.89286 4.75H6.06818C5.34017 4.75 4.75 5.34017 4.75 6.06818C4.75 13.3483 10.6517 19.25 17.9318 19.25C18.6598 19.25 19.25 18.6598 19.25 17.9318V15.1071L16.1429 13.0357L14.5317 14.6468C14.2519 14.9267 13.8337 15.0137 13.4821 14.8321C12.8858 14.524 11.9181 13.9452 10.9643 13.0357C9.98768 12.1045 9.41548 11.1011 9.12829 10.494C8.96734 10.1537 9.06052 9.76091 9.32669 9.49474L10.9643 7.85714L8.89286 4.75Z" stroke="#404040" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg></span>
              <p class="modal__map-item-text">${data.phone.label}</p>
            </a>
               <a href="${data.facebook.link}" class="modal__map-item">
              <span class="modal__map-item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <g clip-path="url(#clip0_330_2067)">
    <path d="M18.125 0H1.875C0.84375 0 0 0.84375 0 1.875V18.125C0 19.1562 0.84375 20 1.875 20H10V11.25H7.5V8.75H10V7.5C10 5.43375 11.6838 3.75 13.75 3.75H16.25V6.25H13.75C13.0625 6.25 12.5 6.8125 12.5 7.5V8.75H16.25L15.625 11.25H12.5V20H18.125C19.1562 20 20 19.1562 20 18.125V1.875C20 0.84375 19.1562 0 18.125 0Z" fill="#404040"/>
  </g>
  <defs>
    <clipPath id="clip0_330_2067">
      <rect width="20" height="20" fill="white"/>
    </clipPath>
  </defs>
</svg></span>
              <p class="modal__map-item-text">${data.facebook.label}</p>
            </a>
          </div>
          <div class="modal__map-footer">
            <a href="${data.location.link}" target="_blank" class="modal__map-link">GET DIRECTION <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <path d="M13.75 6.88867L19.25 12.1387L13.75 17.3887M19 12.1387H4.75" stroke="#B30738" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg></a>
          </div>
    `;

    MicroModal.show("map-info-modal");
  }

  private bindEvents() {
    this.buttons.forEach(button => {
      button.addEventListener("click", this.onButtonClick);
    });

    this.pathes.forEach(path => {
      path.addEventListener("click", this.onPathClick);
    });
  }
}
