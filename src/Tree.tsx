import { useEffect, useState } from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { TreeHelper } from './TreeHelper';

export interface TreeProps {
    data: Obj
    layout: Obj
}

export interface Obj {
    [propName: string]: any;
}

export const Tree: React.FC<TreeProps> = ({ data, layout }) => {
    useEffect(() => {}, [layout]);
    return (
        <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
            <TreeHelper data={data} layout={layout} />
        </TreeView>
    );
};
