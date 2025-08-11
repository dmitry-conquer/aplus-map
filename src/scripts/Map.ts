 export class InteractiveMap {
    private map: HTMLElement | null;
    private label: HTMLElement | null;
    private areas: NodeListOf<SVGPathElement> | null;
    private areaWithMarkers: NodeListOf<SVGPathElement> | null;

    constructor() {
      this.map = document.getElementById('map-body') as HTMLElement;
      this.label = document.getElementById('area-label') as HTMLElement;
      this.areas = this.map.querySelectorAll('path');
      this.areaWithMarkers = this.map.querySelectorAll('path[data-marker]');
    }
    public init() {
      if (this.map && this.label && this.areas && this.areas.length > 0) {
        this.addEventListeners();
        this.updateMarkesPosition();
      } else {
        console.warn('One or more elements not found on the page');
      }
    }

    private setLabelPosition(e: MouseEvent) {
      let shiftPosition = 0;
      const width = this.map?.offsetWidth;
      if (window.innerWidth <= 1024 && width) {
        shiftPosition = e.offsetX > width / 2 ? 140 : 0;
      }
      if (this.label) {
        this.label.style.top = `${e.offsetY + 5}px`;
        this.label.style.left = `${e.offsetX + 10 - shiftPosition}px`;
      }
    }

    private showLabel(area: SVGPathElement) {
      if (this.label) {
        this.label.style.display = 'block';
        this.label.textContent = area.dataset.area || '';
      }
    }

    private hideLAbel() {
      if (this.label) {
        this.label.style.display = 'none';
      }
    }

    private getDivider() {
      const breakpoints = {
        1400: {
          divider: 2,
        },
        992: {
          divider: 4,
        },
        500: {
          divider: 6,
        },
      };
      for (const [width, { divider }] of Object.entries(breakpoints)) {
        if (window.innerWidth < Number(width)) return divider;
      }
      return 1;
    }

    private updateMarkesPosition() {
      const mapRect = this.map?.getBoundingClientRect();
      this.areaWithMarkers?.forEach(path => {
        let marker = null;
        const rect = path.getBoundingClientRect();
        const pathData = path.dataset.marker?.split(',');
        if (pathData) {
          marker = document.getElementById(`id-${pathData[0]}`);
        }
        if (!marker && pathData) {
          marker = document.createElement('div');
          marker.classList.add('path-marker');
          marker.id = `id-${pathData[0]}`;
          this.map?.appendChild(marker);
        }
        if (mapRect && pathData && marker) {
          const divider = this.getDivider();
          let shiftX = +pathData[1] / divider || 0;
          let shiftY = +pathData[2] / divider || 0;
          marker.style.left = `${rect.left - mapRect.left + rect.width / 2 + shiftX}px`;
          marker.style.top = `${rect.top - mapRect.top + rect.height / 2 + shiftY}px`;
        }
      });
    }

    private addEventListeners() {
      this.areas?.forEach(area => {
        area.addEventListener('mousemove', () => this.showLabel(area));
        area.addEventListener('mouseleave', () => this.hideLAbel());
      });
      this.map?.addEventListener('mousemove', e => this.setLabelPosition(e));
      window.addEventListener('resize', () => this.updateMarkesPosition());
    }
  }