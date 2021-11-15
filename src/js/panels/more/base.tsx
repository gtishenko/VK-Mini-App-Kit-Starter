import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Group,
    Panel,
    PanelHeader,
    Placeholder
} from "@vkontakte/vkui";

import { Icon56InfoOutline } from '@vkontakte/icons';
// import { IStore } from '../../store/reducers';
import { showSnackbar, closeSnackbar } from '../../store/router/actions';

interface IProps {
    id: string,
    snackbar: JSX.Element | null
}

export default function MorePanelBase(props: IProps) {
    const { id, snackbar } = props;
    // const result: any = useSelector((store: IStore) => store.data.test);
    const dispatch = useDispatch();
    
    // componentDidMount
    useEffect(() => {
    }, []);

    return (
        <Panel id={id}>
            <PanelHeader>Главная 2</PanelHeader>
            <Group>
                <Placeholder
                    icon={<Icon56InfoOutline />}
                    header="Тут ничего нет"
                >
                    Но вы можете это исправить
                </Placeholder>
            </Group>
            {snackbar}
        </Panel>
    )
}