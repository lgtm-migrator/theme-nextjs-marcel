import { IconEmail, IconPhone } from '@prezly/icons';
import type { NewsroomCompanyInformation } from '@prezly/sdk';
import classNames from 'classnames';

import styles from './Boilerplate.module.css';

type Props = {
    companyInformation: NewsroomCompanyInformation;
};

function Boilerplate({ companyInformation }: Props) {
    const { name, about, address, email, phone } = companyInformation;

    if (!about && !address) {
        return null;
    }

    return (
        <div className="mb-12 text-neutral-300">
            <h2 className="text-xl leading-6 mb-4 font-bold">
                About
                {name && ' '}
                {name}
            </h2>
            {about && (
                <div
                    className={classNames(
                        'leading-7 mb-4 font-normal text-neutral-400',
                        styles.boilerplate,
                    )}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: about }}
                />
            )}

            {email && (
                <a className="flex items-center mt-4 mb-4" href={`mailto:${email}`}>
                    <IconEmail className="mr-2 text-primary-lighter" width={14} height={14} />
                    <span className="text-primary-lighter font-semibold">{email}</span>
                </a>
            )}

            {phone && (
                <a className="flex items-center mt-4 mb-4" href={`tel:${phone}`}>
                    <IconPhone className="mr-2 text-primary-lighter" width={14} height={14} />
                    <span className="text-primary-lighter font-semibold">{phone}</span>
                </a>
            )}

            {address && (
                <address className="leading-7 text-neutral-400 not-italic">
                    {companyInformation.address}
                </address>
            )}
        </div>
    );
}

export default Boilerplate;
