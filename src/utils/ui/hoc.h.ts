import { ReactNode } from "react";

/**
 * DynamRender的处理器
 */
export class DynamRenderHanlder {
    private frontNode: ReactNode;

    constructor(
        private refresh: () => void
    ) { }

    getFrontNode() {
        return this.frontNode;
    }

    renderOnFront(node: ReactNode) {
        this.frontNode = node;
        this.refresh();
    }

    detachOnFront() {
        if (!this.frontNode) return;
        this.frontNode = null;
        this.refresh();
    }

    destroy() {
        this.frontNode = null;
        this.refresh = null;
    }
}