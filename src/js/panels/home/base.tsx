import React from 'react';
import { connect } from 'react-redux';

import { closePopout, goBack, openModal, openPopout, setPage } from '../../store/router/actions';

import {
    Group,
    Panel,
    PanelHeader,
    Placeholder,
    Snackbar
} from "@vkontakte/vkui";

import { Icon20CheckCircleFillGreen, Icon16ErrorCircleFill, Icon56InfoOutline } from '@vkontakte/icons';

interface IProps {
    id: string,
    setPage?: any,
    goBack?: any,
    openPopout?: any,
    closePopout?: any,
    openModal?: any
}

interface IState {
    snackbar?: React.ReactNode | null,
    internetError?: boolean
}

class HomePanelBase extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        
        this.state = {
            snackbar: null
        };
    }

    showSnackbar(type: 0 | 1, text: string): void {
        if (this.state.snackbar) return;
        var icon;
        if (type === 0) icon = <Icon16ErrorCircleFill width={24} height={24} />;
        else if (type === 1) icon = <Icon20CheckCircleFillGreen width={24} height={24} />;
        this.setState({
            snackbar:
                <Snackbar
                    layout="vertical"
                    onClose={() => this.setState({ snackbar: null })}
                    before={icon}
                >
                    {text}
                </Snackbar>
        });
    }

    componentDidMount() {

    }

    render() {
        const { id, openModal } = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Главная</PanelHeader>
                <Group>
                    <Placeholder
                        icon={<Icon56InfoOutline />}
                        header={"Header"}
                        onClick={() => {
                            openModal();
                        }}
                    >
                        Привет
                    </Placeholder>
                </Group>
                {this.state.snackbar}
            </Panel>
        );
    }

}

const mapDispatchToProps = {
    setPage,
    goBack,
    openPopout,
    closePopout,
    openModal
};

export default connect(null, mapDispatchToProps)(HomePanelBase);