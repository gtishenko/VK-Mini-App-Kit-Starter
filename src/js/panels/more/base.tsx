import React from 'react';
import { connect } from 'react-redux';

import { setPage } from "../../store/router/actions";

import {
    Panel,
    PanelHeader
} from "@vkontakte/vkui";

interface IProps {
    id: string,
    setPage?: any,
    goBack?: any,
    openPopout?: any,
    closePopout?: any,
    openModal?: any
}

interface IState {
    snackbar?: JSX.Element | null,
    internetError?: boolean
}

class HomePanelProfile extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            
        };
    }

    componentWillUnmount() {
    }

    componentDidMount() {
    }

    render() {
        const { id, setPage } = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Hello!</PanelHeader>
            </Panel>
        );
    }

}

const mapDispatchToProps = {
    setPage
};

export default connect(null, mapDispatchToProps)(HomePanelProfile);
