import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { goBack, closeModal, setStory } from "./js/store/router/actions";
import { getActivePanel } from "./js/services/functions";
// import bridge from '@vkontakte/vk-bridge'
// import { setColorScheme } from "./js/store/vk/actions";

import {
    Epic,
    View,
    Root,
    ModalRoot,
    ConfigProvider,
    AdaptivityProvider,
    AppRoot,
    TabbarItem,
    Tabbar,
    SplitLayout,
    PanelHeader,
    SplitCol,
    Group,
    Cell,
    Panel,
    PlatformType,
    Platform
} from "@vkontakte/vkui";

import HomePanelBase from './js/panels/home/base';

import MorePanelBase from './js/panels/more/base';

import ExampleModal from './js/components/modals/ExampleModal';

import { Icon28Newsfeed, Icon28NewsfeedOutline, Icon28ServicesOutline, Icon28MessageOutline, Icon28ClipOutline, Icon28UserCircleOutline } from '@vkontakte/icons';
import { setData } from './js/store/data/actions';

const vk_platform = new URLSearchParams(window.location.search).get("vk_platform");

interface IProps {
    id: string,
    setStory: any,
    goBack: any,
    closeModal: any,
    setData: any,

    activeView: string | null,
    activeStory: string | null,

    panelsHistory: {
        [key: string]: string[] | null
    },
    activeModals: {
        [key: string]: string /* [] */ | null
    },
    popouts: {
        [key: string]: string[] | null
    },
    scrollPosition: {
        [key: string]: number | null
    },

    activePanel: string | null,
    colorScheme: string,

    lastAndroidBackAction: number,
}

interface IState {
    platform: PlatformType
}

class App extends React.Component<IProps, IState> {

    lastAndroidBackAction: number = 0;

    constructor(props: IProps) {
        super(props);

        this.state = {
            platform: Platform.IOS
        };

        this.lastAndroidBackAction = 0;
    }

    componentDidMount() {
        const { goBack, scrollPosition, activeStory, activeView, activePanel } = this.props;

        var platform: PlatformType;

        if (vk_platform === 'mobile_web' || vk_platform === 'desktop_web') platform = Platform.VKCOM;
        else if (vk_platform === 'mobile_android' || vk_platform === 'mobile_android_messenger') platform = Platform.ANDROID;
        else platform = Platform.IOS;

        this.setState({
            platform: platform
        });

        window.onpopstate = () => {
            let timeNow = +new Date();

            if (timeNow - this.lastAndroidBackAction > 500) {
                this.lastAndroidBackAction = timeNow;

                goBack();
            } else {
                window.history.pushState(null, null!);
            }
        };
    }

    componentDidUpdate(prevProps: any): void {
        const { activeView, activeStory, activePanel, scrollPosition } = this.props;

        if (
            prevProps.activeView !== activeView ||
            prevProps.activePanel !== activePanel ||
            prevProps.activeStory !== activeStory
        ) {
            let pageScrollPosition: number | null = scrollPosition[activeStory + "_" + activeView + "_" + activePanel];

            if(pageScrollPosition) window.scroll(0, pageScrollPosition);
        }
    }

    render() {
        const { goBack, setStory, closeModal, popouts, activeView, activeStory, activeModals, panelsHistory } = this.props;

        let history: any = (panelsHistory[activeView!] === undefined) ? [activeView] : panelsHistory[activeView!];
        let popout: string[] | null = (popouts[activeView!] === undefined) ? null : popouts[activeView!];
        
        const activeModal: string | null | undefined = activeModals[activeView!];

        const homeModals: any = (
            <ModalRoot activeModal={activeModal}>
                <ExampleModal
                    id="EXAMPLE_MODAL"
                    onClose={() => closeModal()}
                />
            </ModalRoot>
        );

        const isDesktop = vk_platform === "desktop_web";
        const hasHeader = vk_platform !== "desktop_web";

        return (
            <ConfigProvider platform={this.state.platform} isWebView={true}>
                <AdaptivityProvider>
                    <AppRoot>
                        <SplitLayout
                            header={hasHeader && <PanelHeader separator={false} />}
                            style={{ justifyContent: "center" }}
                            modal={homeModals}
                            popout={popout}
                        >
                            {isDesktop && (
                                <SplitCol fixed width="280px" maxWidth="280px">
                                    <Panel>
                                        {hasHeader && <PanelHeader />}
                                        <Group>
                                            <Cell
                                                disabled={activeStory === 'home'}
                                                style={activeStory === 'home' ? {
                                                    backgroundColor: "var(--button_secondary_background)",
                                                    borderRadius: 8
                                                } : {}}
                                                before={<Icon28NewsfeedOutline />}
                                                onClick={() => setStory("home", "base")}
                                            >
                                                Главная
                                                </Cell>
                                            <Cell
                                                disabled={activeStory === 'services'}
                                                style={activeStory === 'services' ? {
                                                    backgroundColor: "var(--button_secondary_background)",
                                                    borderRadius: 8
                                                } : {}}
                                                before={<Icon28ServicesOutline />}
                                                onClick={() => setStory("services", "base")}
                                            >
                                                Сервисы
                                            </Cell>
                                            <Cell
                                                disabled={activeStory === 'messages'}
                                                style={activeStory === 'messages' ? {
                                                    backgroundColor: "var(--button_secondary_background)",
                                                    borderRadius: 8
                                                } : {}}
                                                before={<Icon28MessageOutline />}
                                                onClick={() => setStory("messages", "base")}
                                            >
                                                Месенджер
                                            </Cell>
                                            <Cell
                                                disabled={activeStory === 'clips'}
                                                style={activeStory === 'clips' ? {
                                                    backgroundColor: "var(--button_secondary_background)",
                                                    borderRadius: 8
                                                } : {}}
                                                before={<Icon28ClipOutline />}
                                                onClick={() => setStory("clips", "base")}
                                            >
                                                Клипы
                                            </Cell>
                                            <Cell
                                                disabled={activeStory === 'profile'}
                                                style={activeStory === 'profile' ? {
                                                    backgroundColor: "var(--button_secondary_background)",
                                                    borderRadius: 8
                                                } : {}}
                                                before={<Icon28UserCircleOutline />}
                                                onClick={() => setStory("profile", "base")}
                                            >
                                                Профиль
                                            </Cell>
                                        </Group>
                                    </Panel>
                                </SplitCol>
                            )}

                            <SplitCol
                                animate={!isDesktop}
                                spaced={isDesktop}
                                width={isDesktop ? '560px' : '100%'}
                                maxWidth={isDesktop ? '560px' : '100%'}
                            >
                                <Epic activeStory={activeStory!} tabbar={!isDesktop &&
                                    <Tabbar>
                                        <TabbarItem
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                setStory('home', 'base');
                                            }}
                                            selected={activeStory === 'home'}
                                        >
                                            <Icon28Newsfeed />
                                        </TabbarItem>
                                        <TabbarItem
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                setStory('more', 'base');
                                            }}
                                            selected={activeStory === 'more'}
                                        >
                                            <Icon28Newsfeed />
                                        </TabbarItem>
                                    </Tabbar>
                                }>
                                    <Root id="home" activeView={activeView!}>
                                        <View
                                            id="home"
                                            activePanel={getActivePanel("home")}
                                            history={history}
                                            onSwipeBack={() => goBack()}
                                        >
                                            <HomePanelBase id="base" />
                                        </View>
                                    </Root>
                                    <Root id="more" activeView={activeView!}>
                                        <View
                                            id="more"
                                            activePanel={getActivePanel("more")}
                                            history={history}
                                            onSwipeBack={() => goBack()}
                                        >
                                            <MorePanelBase id="base" />
                                        </View>
                                    </Root>
                                </Epic>
                            </SplitCol>
                        </SplitLayout>
                    </AppRoot>
                </AdaptivityProvider>
            </ConfigProvider>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        activeView: state.router.activeView,
        activeStory: state.router.activeStory,
        panelsHistory: state.router.panelsHistory,
        activeModals: state.router.activeModals,
        popouts: state.router.popouts,
        scrollPosition: state.router.scrollPosition,
        activePanel: state.router.activePanel,

        colorScheme: state.vkui.colorScheme
    };
};

const mapDispatchToProps = {
    setStory,
    goBack,
    closeModal,
    setData
};

export default connect(mapStateToProps, mapDispatchToProps)(App);