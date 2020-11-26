import { action, computed, observable } from 'mobx';

import { ArrayFetchingStore } from '../fetchingStores/ArrayFetchingStore';

export abstract class EditableTableStore<T> extends ArrayFetchingStore<T> {
    editingId = observable.box('');
    editingObject = observable.box({} as T);
    newItem = observable.box(false);
    newItemNumber: number = 0;

    @computed get id() {
        return this.editingId.get();
    }

    @computed get isNew() {
        return this.newItem.get();
    }

    @computed get currentObject() {
        return this.editingObject.get();
    }

    setCurrentObject = action((obj: T) => this.editingObject.set(obj));

    setId = action((id: string) => this.editingId.set(id));

    setNewItem = action((isNew: boolean) => this.newItem.set(isNew));

    resetEditing = action(() => {
        this.removeCurrentRowIfNew();
        this.editingId.set('');
        this.editingObject.set({} as T);
        this.newItem.set(false);
    });

    createNewRow = action(() => {
        this.resetEditing();
        this.setNewItem(true);
        this.setId(`temp-${this.newItemNumber}`);
        this.newItemNumber += 1;
        this.setCurrentObject({} as T);
    });

    removeCurrentRowIfNew = action(() => {
        if (this.isNew) {
            this.payload.pop();
            this.newItem.set(false);
        }
    });
}
