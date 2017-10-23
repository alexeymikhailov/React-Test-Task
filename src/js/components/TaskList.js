import React from 'react';
import Parser from 'html-react-parser';

const TaskList=({ data }) => {
	return (
		<div className="section-table">
            <table>
            	<thead>
                	<tr>
                  		<th>Т</th>
                  		<th>Тикет</th>
                  		<th>Название</th>
                  		<th>П <i className="table-icon-triangle-down"></i></th>
                  		<th>Статус</th>
                  		<th>Решение</th>
                  		<th>Создано</th>
                  		<th>Обновлено</th>
                  		<th>Дедлайн</th>
                  		<th></th>
                	</tr>
              	</thead>
              	<tbody>
                	{
                		data.map((task, index) => {
                			return (
					            <tr key={index}>
					            	<td>{Parser(task.t)}</td>
					              	<td>{Parser(task.ticket)}</td>
					              	<td>{Parser(task.name)}</td>
					              	<td>{Parser(task.p)}</td>
					              	<td>{Parser(task.status)}</td>
					              	<td>{Parser(task.decision)}</td>
					              	<td>{Parser(task.created)}</td>
					              	<td>{Parser(task.updated)}</td>
					              	<td>{Parser(task.deadline)}</td>
					              	<td>{Parser(task.elipsis)}</td>
					            </tr>
                			)
                		})
                	}
              	</tbody>
            </table>
        </div>
	);
};

export default TaskList;