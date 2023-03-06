/**
 * External dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { CheckboxControl } from '@woocommerce/blocks-checkout';
import { getSetting } from '@woocommerce/settings';
import { useSelect, useDispatch } from '@wordpress/data';

const { optInDefaultText } = getSetting( 'slot-fill-test-repo_data', '' );

const Block = ( { children, checkoutExtensionData } ) => {
	const [ checked, setChecked ] = useState( false );
	const { setExtensionData } = checkoutExtensionData;

	const { setValidationErrors, clearValidationError } = useDispatch(
		'wc/store/validation'
	);

	useEffect( () => {
		setExtensionData( 'slot-fill-test-repo', 'optin', checked );
		if ( ! checked ) {
			setValidationErrors( {
				'slot-fill-test-repo': {
					message: 'Please tick the box',
					hidden: false,
				},
			} );
			return;
		}
		clearValidationError( 'slot-fill-test-repo' );
	}, [
		clearValidationError,
		setValidationErrors,
		checked,
		setExtensionData,
	] );

	const { validationError } = useSelect( ( select ) => {
		const store = select( 'wc/store/validation' );
		return {
			validationError: store.getValidationError( 'slot-fill-test-repo' ),
		};
	} );

	return (
		<>
			<CheckboxControl
				id="subscribe-to-newsletter"
				checked={ checked }
				onChange={ setChecked }
			>
				{ children || optInDefaultText }
			</CheckboxControl>

			{ validationError?.hidden === false && (
				<div>
					<span role="img" aria-label="Warning emoji">
						⚠️
					</span>
					{ validationError?.message }
				</div>
			) }
		</>
	);
};

export default Block;
