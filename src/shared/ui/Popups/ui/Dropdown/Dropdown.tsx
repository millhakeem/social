import { Menu } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

import { DropdownDirection } from '../../../../types/ui';
import { AppLink } from '../../../AppLink/AppLink';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

import cls from './Dropdown.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    trigger: ReactNode;
    direction?: DropdownDirection;
}

export const Dropdown = (props: DropdownProps) => {
    const { className, trigger, items, direction = 'bottom left' } = props;

    const menuClasses = [mapDirectionClass[direction]];

    return (
        <Menu
            as='div'
            className={classNames('', {}, [className, popupCls.popup])}
        >
            <Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
                {items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type='button'
                            onClick={item.onClick}
                            disabled={item.disabled}
                            className={classNames(cls.item, {
                                [popupCls.active]: active,
                            })}
                        >
                            {item.content}
                        </button>
                    );

                    return item.href ? (
                        <Menu.Item
                            key={'dropdown' + index}
                            as={AppLink}
                            to={item.href}
                            disabled={item.disabled}
                        >
                            {content}
                        </Menu.Item>
                    ) : (
                        <Menu.Item
                            as={Fragment}
                            disabled={item.disabled}
                            key={'dropdown' + index}
                        >
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
};
