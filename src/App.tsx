import React, { useEffect, useState } from 'react';

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
    Platform
} from "@vkontakte/vkui";

import HomePanelBase from './js/panels/home/base';

import MorePanelBase from './js/panels/more/base';

import ExampleModal from './js/components/modals/ExampleModal';

import { Icon28Newsfeed, Icon28NewsfeedOutline, Icon28ServicesOutline, Icon28MessageOutline, Icon28ClipOutline, Icon28UserCircleOutline, Icon28More } from '@vkontakte/icons';

import { goBack, setStory, closeModal } from './js/store/router/actions';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from './js/store/reducers';
import { getActivePanel } from './js/services/functions';

export default function App() {
    const vk_platform: string | null = new URLSearchParams(window.location.search).get("vk_platform");
    
    const [platform, setPlatform] = useState(Platform.IOS);
    const [lastAndroidBackAction, setLastAndroidBackAction] = useState(0);
    const [history, setHistory] = useState<any>(undefined);
    const [popout, setPopout] = useState<any>(null);

    const activeView = useSelector((store: IStore) => store.router.activeView);
    const activeStory = useSelector((store: IStore) => store.router.activeStory);
    const panelsHistory = useSelector((store: IStore) => store.router.panelsHistory);
    const activeModals = useSelector((store: IStore) => store.router.activeModals);
    const popouts = useSelector((store: IStore) => store.router.popouts);
    const scrollPosition = useSelector((store: IStore) => store.router.scrollPosition);
    const activePanel = useSelector((store: IStore) => store.router.activePanel);
    const activeSnackbar = useSelector((store: IStore) => store.router.activeSnackbar);

    const dispatch = useDispatch();

    useEffect(() => {
        if (vk_platform === 'mobile_web' || vk_platform === 'desktop_web') setPlatform(Platform.VKCOM);
        else if (vk_platform === 'mobile_android' || vk_platform === 'mobile_android_messenger') setPlatform(Platform.ANDROID);
        else setPlatform(Platform.IOS)

        window.onpopstate = () => {
            let timeNow = +new Date();

            if (timeNow - lastAndroidBackAction > 500) {
                setLastAndroidBackAction(timeNow);

                dispatch(goBack());
            } else {
                window.history.pushState(null, null!);
            }
        };
    }, []);

    useEffect(() => {
        let pageScrollPosition: number | null = scrollPosition[activeStory + "_" + activeView + "_" + activePanel];

        if(pageScrollPosition) window.scroll(0, pageScrollPosition);
    }, [activeView, activePanel, activeStory]);

    useEffect(() => {
        setPopout((popouts[activeView!] === undefined) ? null : popouts[activeView!]);
    }, [popouts, activeView]);

    useEffect(() => {
        setHistory((panelsHistory[activeView!] === undefined) ? [activeView] : panelsHistory[activeView!]);
    }, [panelsHistory, activeView]);
    
    const activeModal: string | null | undefined = activeModals[activeView!];

    const homeModals: any = (
        <ModalRoot activeModal={activeModal}>
            <ExampleModal
                id="EXAMPLE_MODAL"
                onClose={() => dispatch(closeModal())}
            />
        </ModalRoot>
    );

    const isDesktop: boolean = vk_platform === "desktop_web";
    const hasHeader: boolean = vk_platform !== "desktop_web";

    return (
        <ConfigProvider platform={platform} isWebView={true}>
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
                                            onClick={() => dispatch(setStory("home", "base"))}
                                        >
                                            Главная
                                            </Cell>
                                        <Cell
                                            disabled={activeStory === 'more'}
                                            style={activeStory === 'more' ? {
                                                backgroundColor: "var(--button_secondary_background)",
                                                borderRadius: 8
                                            } : {}}
                                            before={<Icon28More />}
                                            onClick={() => dispatch(setStory("more", "base"))}
                                        >
                                            Ещё
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
                                        onClick={() => dispatch(setStory('home', 'base'))}
                                        selected={activeStory === 'home'}
                                    >
                                        <Icon28Newsfeed />
                                    </TabbarItem>
                                    <TabbarItem
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => dispatch(setStory('more', 'base'))}
                                        selected={activeStory === 'more'}
                                    >
                                        <Icon28More />
                                    </TabbarItem>
                                </Tabbar>
                            }>
                                <Root id="home" activeView={activeView!}>
                                    <View
                                        id="home"
                                        activePanel={getActivePanel("home")}
                                        history={history}
                                        onSwipeBack={() => dispatch(goBack())}
                                    >
                                        <HomePanelBase id="base" snackbar={activeSnackbar} />
                                    </View>
                                </Root>
                                <Root id="more" activeView={activeView!}>
                                    <View
                                        id="more"
                                        activePanel={getActivePanel("more")}
                                        history={history}
                                        onSwipeBack={() => dispatch(goBack())}
                                    >
                                        <MorePanelBase id="base" snackbar={activeSnackbar} />
                                    </View>
                                </Root>
                            </Epic>
                        </SplitCol>
                    </SplitLayout>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    )
}