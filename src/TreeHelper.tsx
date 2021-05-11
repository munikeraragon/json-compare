import TreeItem from '@material-ui/lab/TreeItem';

export interface Obj {
    [propName: string]: any;
}

export interface TreeHelperProps {
    data: Obj
    layout: Obj
}

let nodeId = 1;

export const TreeHelper: React.FC<TreeHelperProps> = ({ data, layout }) => {

    if (typeof data === 'string') {
        let temp = typeof layout === 'string' ? layout === '_equal_' : false;
        return (
            <TreeItem nodeId={(nodeId++).toString()} label={data} style={{ color: temp ? 'blue' : 'red' }} />
        );
    }

    if (data === null) {
        return <TreeItem nodeId={(nodeId++).toString()} label='empty' />;
    }
    


    return (
        <div style={{marginBottom: '30px'}}>
            {Object.keys(data).map((key: string) => {
                let temp =
                    typeof layout[key] === 'string'
                        ? layout[key] === '_equal_'
                        : layout[key] && layout[key]['leaves'] === '_equal_';
                
                return (
                    <TreeItem
                        nodeId={(nodeId++).toString()}
                        label={key}
                        key={nodeId}
                        style={{ color: temp ? 'blue' : 'red' }}
                    >
                        <TreeHelper
                            data={data[key]}
                            layout={layout[key] ? layout[key] : {}}

                        />
                    </TreeItem>
                );
            })}
        </div>
    );
};