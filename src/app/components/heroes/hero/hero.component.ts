import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, Type, ViewContainerRef } from '@angular/core';
import { HeroComponentResolver } from '@app/components/heroes/hero/hero.resolver';
import { ComponentAdapterRef, ComponentPresenter } from '@app/core/component';
import { HeroBase } from '@app/domain/heroes';

import { HeroComponentBase } from './hero.component.interface';

@Component({
    selector: 'app-hero',
    template: ``
})
export class HeroComponent implements HeroComponentBase, OnInit, OnChanges, OnDestroy {

    @Input() hero: HeroBase;

    private adapters: ComponentAdapterRef<HeroComponentBase>[];

    constructor(
        private presenter: ComponentPresenter,
        private resolver: HeroComponentResolver,
        private viewContainerRef: ViewContainerRef
    ) {}

    ngOnChanges (changes: SimpleChanges) {
        if (changes.hero && this.resolver.hasChanges(changes.hero)) {
            const components: Type<HeroComponentBase>[] = this.resolver.resolve(changes.hero.currentValue);

            this.adapters = this.presenter.init(this, components, this.viewContainerRef);
        }

        this.presenter.changes(this.adapters, changes);
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.presenter.dispose(this.adapters);
    }

}
