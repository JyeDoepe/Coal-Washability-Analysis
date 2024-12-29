import pandas as pd
import numpy as np

def ash_to_sg(data, ash):
    data.replace(-np.inf, None, inplace=True)
    remove_row = True
    if data[data['H'] == ash].shape[0] > 0:
        new_row_index = data[data['H'] == ash].index[0]
        remove_row = False
    else:
        new_rows = pd.DataFrame({'H': [ash]})
        data = pd.concat([data, new_rows], ignore_index=True)
        data = data.sort_values(by='H')
        data = data.reset_index(drop=True)
        new_row_index = data[data['A'].isna()].index[0]
        if new_row_index > 0:
            percent_increase = (data['H'][new_row_index] - data['H'][new_row_index-1]) / (data['H'][new_row_index+1] - data['H'][new_row_index-1])
            for col in ['A', 'D']:
                data[col][new_row_index] = (data[col][new_row_index+1] - data[col][new_row_index-1]) * percent_increase + data[col][new_row_index-1]
        # data = data.drop(index=1)
    res = {
            'trace1': {'x': [ash, ash], 'y': [100, data['D'][new_row_index]]},
            'trace2': {'x': [100, data['A'][new_row_index]], 'y': [data['D'][new_row_index], data['D'][new_row_index]]},
            'trace3': {'x': [data['A'][new_row_index], data['A'][new_row_index]], 'y': [data['D'][new_row_index], 0]}
           }
    print(data)
    if remove_row:
        data = data.drop(index=new_row_index)
        print(data) 
        data = data.reset_index(drop=True)
    res['data'] = data.to_dict()
    return res

if __name__ == '__main__':
    from app.functions.process_data import process_data
    sample_data = pd.read_csv("app/data/sample1.csv")
    sample_data = process_data(sample_data)
    ash_to_sg(sample_data, 4)