import { memo } from 'react';

import cls from './ArticleViewSelector.module.scss';

import { ArticleView } from '@/entities/Article';
import GreedIcon from '@/shared/assets/icons/greed.svg';
import ListIcon from '@/shared/assets/icons/list.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { HStack } from '@/shared/ui/Stack';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: 'LIST',
        icon: ListIcon,
    },
    {
        view: 'GREED',
        icon: GreedIcon,
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onChangeView = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <HStack gap='8' className={classNames('', {}, [className])}>
            {viewTypes.map((type) => (
                <Button
                    disabled={type.view === view}
                    key={type.view}
                    theme={ButtonTheme.CLEAR}
                    onClick={onChangeView(type.view as ArticleView)}
                >
                    <Icon
                        Svg={type.icon}
                        className={classNames('', {
                            [cls.notSelected]: type.view !== view,
                        })}
                    />
                </Button>
            ))}
        </HStack>
    );
});
