import React, {useState} from 'react';
import { EmptyState, Layout, Page } from '@shopify/polaris';
import { ResourcePicker } from '@shopify/app-bridge-react';
function Index(){
    // const [modal, setModal]
    return(
        <div>
            <EmptyState
            heading="Manage your inventory transfers"
            action={{content: 'Add transfer'}}
            secondaryAction={{content: 'Learn more', url: 'https://help.shopify.com'}}
            image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
            >
            <p>Track and receive your incoming inventory from suppliers.</p>
            </EmptyState>
        </div>
    )
}

export default Index;