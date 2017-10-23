import React, { Component } from 'react';
import Parser from 'html-react-parser';
import ReactPaginate from 'react-paginate';
import dataTask from '../../../data';
import TaskList from '../components/TaskList';

class App extends Component {
	constructor(props) {
		super(props);

		this.state={
			dataInitial: dataTask,
			data: [],
			valueSelectDate: '',
			valueSelectTasks: '',
			filters: [],
			firstRenderLi: true,
			firstRenderTasks: true,
			menu: {
				'Все задачи': {
					liOne: true
				},
				'Открытые': {
					liTwo: false
				},
				'Выполненные': {
					liThree: false
				}
			},
			numberTasks: {
				'20': {
					taskOne: true
				},
				'50': {
					taskTwo: false
				},
				'100': {
					taskThree: false
				},
				'все': {
					taskFour: false
				}
			},
			numPerPages: 20,
			pageCount: 0
		};

		this.onSelectDateChange=(e) => {
			if (!parseInt(e.target.value.split('').reverse().join(''))) {
				this.setState({
					filters: [],
					valueSelectDate: [e.target, e.target.value],
					numberTasks: {
						'20': {
							taskOne: true
						},
						'50': {
							taskTwo: false
						},
						'100': {
							taskThree: false
						},
						'все': {
							taskFour: false
						}
					},
					pageCount: Math.ceil(this.state.dataInitial.length / this.state.numPerPages)
				});

				return;
			} 

			const monthList=[
				"Январь", "Февраль", "Март",
				"Апрель", "Май", "Июнь",
				"Июль", "Август", "Сентябрь",
				"Октябрь", "Ноябрь", "Декабрь"
			];

			const date=`${String(monthList.indexOf(e.target.value.match(/\S+(?=,)/ig)[0]) + 1).replace(/\b([0-9])\b/g, '0$1')}.${e.target.value.slice(-2)}`;

			const arrData=this.state.dataInitial.filter((task) => {
				return task.created.match(/\d+[.]+\d+$/g) == date;
			});

			this.setState({
				filters: arrData,
				valueSelectDate: [e.target, e.target.value],
				valueSelectTasks: 'Все задачи',
				numberTasks: {
					'20': {
						taskOne: false
					},
					'50': {
						taskTwo: false
					},
					'100': {
						taskThree: false
					},
					'все': {
						taskFour: false
					}
				},
				pageCount: 0
			});
		};

		this.onSelectTaskChange=(e) => {
			if (e.target.value === 'Все задачи') {
				this.setState({
					filters: [],
					valueSelectDate: 'За всё время',
					valueSelectTasks: [e.target, e.target.value],
					numberTasks: {
						'20': {
							taskOne: true
						},
						'50': {
							taskTwo: false
						},
						'100': {
							taskThree: false
						},
						'все': {
							taskFour: false
						}
					},
					pageCount: Math.ceil(this.state.dataInitial.length / this.state.numPerPages)
				});
			} else if (e.target.value === 'Открытые задачи') {
				const arrData=this.state.dataInitial.filter((task) => {
					return task.status === 'Открыто';
				});

				this.setState({
					filters: arrData,
					valueSelectDate: 'За всё время',
					valueSelectTasks: [e.target, e.target.value],
					numberTasks: {
						'20': {
							taskOne: false
						},
						'50': {
							taskTwo: false
						},
						'100': {
							taskThree: false
						},
						'все': {
							taskFour: false
						}
					},
					pageCount: 0
				});
			} else if (e.target.value === 'Выполненные задачи') {
				const arrData=this.state.dataInitial.filter((task) => {
					return task.status === 'Выполнено';
				});

				this.setState({
					filters: arrData,
					valueSelectDate: 'За всё время',
					valueSelectTasks: [e.target, e.target.value],
					numberTasks: {
						'20': {
							taskOne: false
						},
						'50': {
							taskTwo: false
						},
						'100': {
							taskThree: false
						},
						'все': {
							taskFour: false
						}
					},
					pageCount: 0
				});
			}
		};

		this.onHandleSearchSubmit=(e) => {
			e.preventDefault();

			if (this.state.filters.length) {
				const searchData=this.state.filters.filter((task) => {
					return task.name.toLowerCase().includes(this.inputText.value.toLowerCase());
				});

				this.setState({
					filters: searchData,
					data: this.state.dataInitial.slice(0, 20),
					firstRenderLi: !this.state.firstRenderLi,
					firstRenderTasks: !this.state.firstRenderTasks,
					valueSelectDate: 'За всё время',
					valueSelectTasks: 'Все задачи',
					numberTasks: {
						'20': {
							taskOne: false
						},
						'50': {
							taskTwo: false
						},
						'100': {
							taskThree: false
						},
						'все': {
							taskFour: false
						}
					},
					pageCount: 0
				});
			} else {
				const searchData=this.state.dataInitial.filter((task) => {
					return task.name.toLowerCase().includes(this.inputText.value.toLowerCase());
				});

				this.setState({
					filters: searchData,
					data: this.state.dataInitial.slice(0, 20),
					firstRenderLi: !this.state.firstRenderLi,
					firstRenderTasks: !this.state.firstRenderTasks,
					valueSelectDate: 'За всё время',
					valueSelectTasks: 'Все задачи',
					numberTasks: {
						'20': {
							taskOne: false
						},
						'50': {
							taskTwo: false
						},
						'100': {
							taskThree: false
						},
						'все': {
							taskFour: false
						}
					},
					pageCount: 0
				});
			}

			e.target.reset();
		};

		this.onHandleFilterTask=(e) => {
			e.preventDefault();

			if (e.target.textContent.trim() === 'Все задачи') {
				if (this.state.firstRenderLi) {
					this.setState({
						firstRenderLi: !this.state.firstRenderLi
					});

					return;
				}

				this.setState({
					filters: [],
					valueSelectDate: 'За всё время',
					valueSelectTasks: 'Все задачи',
					menu: {
						'Все задачи': {
							liOne: true
						},
						'Открытые': {
							liTwo: false
						},
						'Выполненные': {
							liThree: false
						}
					},
					numberTasks: {
						'20': {
							taskOne: true
						},
						'50': {
							taskTwo: false
						},
						'100': {
							taskThree: false
						},
						'все': {
							taskFour: false
						}
					},
					pageCount: Math.ceil(this.state.dataInitial.length / this.state.numPerPages)
				});
			} else if (e.target.textContent.trim() === 'Открытые') {
				if (this.state.firstRenderLi) {
					this.setState({
						firstRenderLi: !this.state.firstRenderLi
					});
				}

				const arrData=this.state.dataInitial.filter((task) => {
					return task.status === 'Открыто';
				});

				this.setState({
					filters: arrData,
					valueSelectDate: 'За всё время',
					valueSelectTasks: 'Все задачи',
					menu: {
						'Все задачи': {
							liOne: false
						},
						'Открытые': {
							liTwo: true
						},
						'Выполненные': {
							liThree: false
						}
					},
					numberTasks: {
						'20': {
							taskOne: false
						},
						'50': {
							taskTwo: false
						},
						'100': {
							taskThree: false
						},
						'все': {
							taskFour: false
						}
					},
					pageCount: 0
				});
			} else if (e.target.textContent.trim() === 'Выполненные') {
				if (this.state.firstRenderLi) {
					this.setState({
						firstRenderLi: !this.state.firstRenderLi
					});
				}

				const arrData=this.state.dataInitial.filter((task) => {
					return task.status === 'Выполнено';
				});

				this.setState({
					filters: arrData,
					valueSelectDate: 'За всё время',
					valueSelectTasks: 'Все задачи',
					menu: {
						'Все задачи': {
							liOne: false
						},
						'Открытые': {
							liTwo: false
						},
						'Выполненные': {
							liThree: true
						}
					},
					numberTasks: {
						'20': {
							taskOne: false
						},
						'50': {
							taskTwo: false
						},
						'100': {
							taskThree: false
						},
						'все': {
							taskFour: false
						}
					},
					pageCount: 0
				});
			}
		};

		this.onHandlePageClick=(data) => {
			const currentPage=Number(data.selected + 1);

			if (currentPage <= this.state.pageCount) {
				const arrNextListTask=this.state.dataInitial.slice((currentPage * this.state.numPerPages - this.state.numPerPages), (currentPage * this.state.numPerPages));

				this.setState({
					data: arrNextListTask,
					currentPage: currentPage
				});
			}
		};

		this.onHandleNumberOfTasks=(e) => {
			if (e.target.textContent.trim() === '20') {
				if (this.state.firstRenderTasks) {
					this.setState({
						firstRenderTasks: !this.state.firstRenderTasks
					});
				}

				this.setState({
					pageCount: Math.ceil(this.state.dataInitial.length / Number(e.target.textContent.trim())),
					data: this.state.dataInitial.slice((Number(e.target.textContent.trim()) - Number(e.target.textContent.trim())), (Number(e.target.textContent.trim()))),
					filters: [],
					valueSelectDate: 'За всё время',
					valueSelectTasks: 'Все задачи',
					numPerPages: Number(e.target.textContent.trim()),
					numberTasks: {
						'20': {
							taskOne: true
						},
						'50': {
							taskTwo: false
						},
						'100': {
							taskThree: false
						},
						'все': {
							taskFour: false
						}
					}
				});
			} else if (e.target.textContent.trim() === '50') {
				if (this.state.firstRenderTasks) {
					this.setState({
						firstRenderTasks: !this.state.firstRenderTasks
					});
				}

				this.setState({
					pageCount: Math.ceil(this.state.dataInitial.length / Number(e.target.textContent.trim())),
					data: this.state.dataInitial.slice((Number(e.target.textContent.trim()) - Number(e.target.textContent.trim())), (Number(e.target.textContent.trim()))),
					filters: [],
					valueSelectDate: 'За всё время',
					valueSelectTasks: 'Все задачи',
					numPerPages: Number(e.target.textContent.trim()),
					numberTasks: {
						'20': {
							taskOne: false
						},
						'50': {
							taskTwo: true
						},
						'100': {
							taskThree: false
						},
						'все': {
							taskFour: false
						}
					}
				});

			} else if (e.target.textContent.trim() === '100') {
				if (this.state.firstRenderTasks) {
					this.setState({
						firstRenderTasks: !this.state.firstRenderTasks
					});
				}

				this.setState({
					pageCount: Math.ceil(this.state.dataInitial.length / Number(e.target.textContent.trim())),
					data: this.state.dataInitial.slice((Number(e.target.textContent.trim()) - Number(e.target.textContent.trim())), (Number(e.target.textContent.trim()))),
					filters: [],
					valueSelectDate: 'За всё время',
					valueSelectTasks: 'Все задачи',
					numPerPages: Number(e.target.textContent.trim()),
					numberTasks: {
						'20': {
							taskOne: false
						},
						'50': {
							taskTwo: false
						},
						'100': {
							taskThree: true
						},
						'все': {
							taskFour: false
						}
					}
				});
			} else if (e.target.textContent.trim() === 'все') {
				if (this.state.firstRenderTasks) {
					this.setState({
						firstRenderTasks: !this.state.firstRenderTasks
					});
				}

				this.setState({
					pageCount: 1,
					data: this.state.dataInitial,
					valueSelectDate: 'За всё время',
					valueSelectTasks: 'Все задачи',
					numPerPages: this.state.dataInitial.length,
					numberTasks: {
						'20': {
							taskOne: false
						},
						'50': {
							taskTwo: false
						},
						'100': {
							taskThree: false
						},
						'все': {
							taskFour: true
						}
					},
					pageCount: 0
				});
			}
		};
	}

	shouldComponentUpdate(nextState, nextProps) {
		if (nextState.data !== this.state.data || nextState.numPerPages !== this.state.numPerPages || nextState.filters !== this.state.filters) {
			return true;
		}

		return false;
	}

	componentWillMount() {
		const arrInitialData=this.state.dataInitial.slice((this.state.numPerPages - this.state.numPerPages), (this.state.numPerPages));

		this.setState({
			data: arrInitialData,
			pageCount: Math.ceil(this.state.dataInitial.length / this.state.numPerPages)
		});

		const data={
			selected: 1
		};

		this.onHandlePageClick(data);
	}

	render() {
		let headerNav=(
			<div className="header-nav">
	    		<div className="top">
	      			<div className="header-logo">
	        			<img src={require('../../img/logo_ru.png')} />
	        			<div className="project">
	          				<a href="#">Barcelona Design&nbsp;<i className="icon-triangle-down"></i></a>
	        			</div>
	      			</div>
	      			<div className="profile">
	        			<img src={require('../../img/profile.png')} />
	        			&nbsp;
	        			<span>Petr_Osmanov</span>
	        			<i className="icon-triangle-down"></i>
	      			</div>
	    		</div>
	  		</div>	
		);

		let sectionContainer=(
			<div className="section-container">
		    	<div className="section-nav">
		      		<button type="button">ДОБАВИТЬ ЗАДАЧУ</button>
		      		<div className="nav-panel">
		        		<img src={require('../../img/high.png')} />
		        		<a href="#">Barcelona Design&nbsp;<i className="icon-triangle-down"></i></a>
		      		</div>
		    	</div>
		  	</div>
		);

		let sectionMain=(
			<div className="section-main">
		    	<div className="section-menu">
		      		<div className="title">
		        		<p>СВОДНАЯ ИНФОРМАЦИЯ</p>
		      		</div>
		      		<div className="menu">
		        		<ul onClick={this.onHandleFilterTask}>
		          			<li className={this.state.menu['Все задачи'].liOne ? "active" : ""}>Все задачи {this.state.menu['Все задачи'].liOne ? <i className="icon-triangle-right"></i> : ""}</li>
		          			<li className={this.state.menu['Открытые'].liTwo ? "active" : ""}>Открытые {this.state.menu['Открытые'].liTwo ? <i className="icon-triangle-right"></i> : ""}</li>
		          			<li className={this.state.menu['Выполненные'].liThree ? "active" : ""}>Выполненные {this.state.menu['Выполненные'].liThree ? <i className="icon-triangle-right"></i> : ""}</li>
		        		</ul>
		      		</div>
		      		<div className="reports">
		        		<p>Отчёты</p>
		      		</div>
		    	</div>
		    	<div className="section-control">
		      		<div className="section-head">
		        		<div className="options">
		          			<span>Открытые задачи</span>
		          			<span>{this.state.dataInitial.length}</span>
		        		</div>
		        		<div className="button-add-task">
		          			<a><img src={require('../../img/plus.png')} />Добавить задачу</a>  
		        		</div>
		     		</div>
		      		<div className="section-filters">
		        		<div className="options">
		        			<select value={typeof this.state.valueSelectDate == 'string' ? this.state.valueSelectDate : this.state.valueSelectDate[1]} className="select-date" onChange={this.onSelectDateChange}>
		        				<option defaultValue>За всё время</option>
		          				<option>Декабрь, 2015</option>
		          				<option>Ноябрь, 2015</option>
		        			</select>
		        			<select value={typeof this.state.valueSelectTasks == 'string' ? this.state.valueSelectTasks : this.state.valueSelectTasks[1]} className="select-task" onChange={this.onSelectTaskChange}>
		        				<option defaultValue>Все задачи</option>
		          				<option>Открытые задачи</option>
		          				<option>Выполненные задачи</option>
		        			</select>
		        		</div>
		        		<div className="input-group search">
		        			<form onSubmit={this.onHandleSearchSubmit}>
			          			<input type="text" name="Search" ref={(input) => {this.inputText=input}} className="input-control" autoComplete="off" placeholder="Поиск задач по проекту" />
		          				<button type="submit" className="input-group-addon"></button>
		          			</form>
		        		</div>
		      		</div>
		      		<TaskList data={this.state.filters.length === 0 ? this.state.data : this.state.filters} />
		      		<div className="section-page">
		      			<div className="section-paginate">
			        		<ReactPaginate previousLabel={false}
			        					   previousLinkClassName={"paginate-previous"}
					                       nextLabel={false}
					                       nextLinkClassName={"paginate-next"}
					                       breakLabel={<a href="">...</a>}
					                       breakClassName={"break-me"}
					                       pageCount={this.state.pageCount}
					                       marginPagesDisplayed={2}
					                       pageRangeDisplayed={5}
					                       onPageChange={this.onHandlePageClick}
					                       containerClassName={"pagination"}
					                       pageLinkClassName={"paginate-page"}
					                       subContainerClassName={"pages pagination"}
					                       activeClassName={"active"} 
					        />
				        </div>
		        		<div className="number-tasks" onClick={this.onHandleNumberOfTasks}>
		          			<span>Количество задач:</span>
		          			&nbsp;
		          			<a className={this.state.numberTasks['20'].taskOne ? "active" : ""}>20</a>
		          			&nbsp;
		          			<a className={this.state.numberTasks['50'].taskTwo ? "active" : ""}>50</a>
		          			&nbsp;
		          			<a className={this.state.numberTasks['100'].taskThree ? "active" : ""}>100</a>
		          			&nbsp;
		          			<a className={this.state.numberTasks['все'].taskFour ? "active" : ""}>все</a>
		        		</div>
		      		</div>
		    	</div>
		  	</div>
		);

		let sectionFooter=(
			<div className="section-footer">
		    	<div className="information">
		      		<div className="section-one">
		        		<div className="title">
		          			<p>ВОЗНИКЛИ ВОПРОСЫ?</p>
		          			<span>
		            			ВОСПОЛЬЗУЙТЕСЬ ФОРМОЙ
		            			<br />
		            			ОТПРАВКИ ЗАЯВКИ И МЫ СВЯЖЕМСЯ
		            			<br />
		            			С ВАМИ
		          			</span>
		        		</div>
		        		<div className="button-feedback">
		          			<button type="button">ОСТАВИТЬ ЗАЯВКУ</button>
		        		</div>
		      		</div>
		      		<div className="section-two">
		        		<div className="title">
		          			<p>ИЛИ СВЯЖИТЕСЬ С НАМИ НАПРЯМУЮ:</p>
		          			<span>
		            			Г. МОСКВА УЛ. ВИКТОРЕНКО Д. 11
		            			<br /> 
		            			+7 (499) 502-81-39
		          			</span>
		          			<br />
		          			<br />
		          			<span>ORDER@TRENDSOFT.RU</span>
		        		</div>
		      		</div>
		    	</div>
		  	</div>
		);

		let sectionCommunication=(
			<div className="communication">
    			<div className="info">
      				<div className="name">
        				<span>© ООО «Трендсофт», 2011-2015</span>
        				<span>+7 (499) 502-81-39</span>
      				</div>
      				<div className="media">
        				<a href="/#"><i className="fb"></i></a>
        				<a href="/#"><i className="vk"></i></a>
      				</div>
    			</div>
  			</div>
		);

		return (
			<div>
				{headerNav}
				{sectionContainer}
				{sectionMain}
				{sectionFooter}
				{sectionCommunication}
			</div>
		);	
	}
}

export default App;