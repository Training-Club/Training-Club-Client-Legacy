import React from 'react';
import {IContentDraft} from '../../../models/Content';
import {HStack} from 'native-base';

interface IEditContentFilterOptionsProps {
  draftItem: IContentDraft;
}

const EditContentFilterOptions =
  ({}: IEditContentFilterOptionsProps): JSX.Element => {
    return <HStack />;
  };

export default EditContentFilterOptions;
