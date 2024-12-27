import pandas as pd
import numpy as np

def ash_to_sg(data, ash):
    new_rows = pd.DataFrame({'H': [ash]})
    data = pd.concat([data, new_rows], ignore_index=True)
    data = data.sort_values(by='H')
    data = data.reset_index(drop=True)
    new_row_index = data[data['A'].isna()].index[0]
    print(new_row_index)
    if new_row_index > 0:
        percent_increase = (data['H'][new_row_index] - data['H'][new_row_index-1]) / (data['H'][new_row_index+1] - data['H'][new_row_index-1])
        for col in data.columns:
            print(col)
            data[col][new_row_index] = (data[col][new_row_index+1] - data[col][new_row_index-1]) * percent_increase + data[col][new_row_index-1]
        
    return data

if __name__ == '__main__':
    from app.functions.process_data import process_data
    sample_data = pd.read_csv("app/data/sample1.csv")
    sample_data = process_data(sample_data)
    ash_to_sg(sample_data, 5)