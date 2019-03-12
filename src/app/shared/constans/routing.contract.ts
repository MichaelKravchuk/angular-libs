import {StaticRoutingContract} from '@shared/constans/static-routing.contract';

class SmartRoutingContract {
    public root;

    constructor(props: any) {
        this.root = this.cloneObject(props);
        this.setParents(this.root);
        this.setFromRootPath(this.root);
    }

    private cloneObject(target): any {
        return {
            ...Object.keys(target || {}).reduce((accumulator, key) => {
                if (target[key] instanceof Object) {
                    accumulator[key] = this.cloneObject(target[key]);
                } else if (key !== 'ROOT') {
                    accumulator[key] = {
                        ROOT: target[key]
                    };
                } else {
                    accumulator[key] = target[key];
                }

                return accumulator;
            }, {})
        };
    }

    private setParents(props, parent?): void {
        if (!(props instanceof Object)) {
            return;
        }

        if (parent) {
            props['parent'] = parent;
        }

        Object.keys(props).forEach(item => {
            if (props[item] instanceof Object && item !== 'parent') {
                this.setParents(props[item], props);
            }
        });
    }

    private setFromRootPath(props): void {
        if (!(props instanceof Object)) {
            return;
        }

        props.fromRoot = this.fromRoot.bind(props);

        Object.keys(props || {}).forEach(item => {
            if (item !== 'parent' && item !== 'fromRoot') {
                this.setFromRootPath(props[item]);
            }
        });
    }

    public fromRoot(): string {
        const self: any = this;

        if (self.parent && self.parent.fromRoot) {
            const parent = self.parent.fromRoot();
            return (parent && parent !== '/' ? `${parent}/` : '/')  + self.ROOT;
        }

        return self.ROOT;
    }
}

export const RoutingContract = new SmartRoutingContract(StaticRoutingContract);
