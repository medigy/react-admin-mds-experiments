import React from 'react';
import Avatar from '@salesforce/design-system-react/components/avatar';
type Props = {
    /**
     * **Assistive text for accessibility.**
     * This object is merged with the default props object on every render.
     * * `icon`: Assistive text for accessibility that labels the icon.
     */
    assistiveText?: Partial<{
        icon?: string;
    }>;
    /**
     * Alt attribute to be applied to image (base case) element.
     */
    imgAlt?: string;
    /**
     * Source attribute to be applied to image (base case) element.
     */
    imgSrc?: string;
    /**
     * Initials attribute to optionally pass in initials directly in case of "initials" fallback case.
     */
    initials?: string;
    /**
     * Avatar with initials that are dark text on light background
     */
    inverse?: boolean;
    /**
     * Label attibute to display inside "initials" fallback case. Will be passed as title prop in `abbr` element to provide more specificity.
     */
    label?: string;
    /**
     * Avatar variants to apply relevant styling (circle: user, square: entity) and icon rendering if applicable.
     */
    variant: 'entity' | 'user';
    /**
     * Size of the icon in "icon" fallback case.
     */
    size: 'x-small' | 'small' | 'medium' | 'large';
    /**
     * Title attribute for the avatar container.
     */
    title?: string;
    /**
     * Source attribute to be applied to image (base case) element.
     */
    src?: string;

    children?: React.ReactNode;
};

const DSAvatar = (props: Props) => {
    return <Avatar {...props} imgSrc={props.src} />;
};

export default DSAvatar;
