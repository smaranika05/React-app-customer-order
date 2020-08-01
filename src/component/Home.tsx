import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';


interface IState {
    customers: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { customers: [] }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:5000/customers`).then(data => {
            this.setState({ customers: data.data })
        })
    }

    public deleteCustomer(id: number) {
        axios.delete(`http://localhost:5000/customers/${id}`).then(data => {
            const index = this.state.customers.findIndex(customer => customer.id === id);
            this.state.customers.splice(index, 1);
            this.props.history.push('/');
        })
    }
public render(){
    const customers = this.state.customers;
    return (
        <div>
            {customers.length === 0 && (
                <div className="text-center">
                    <h2>No customer found at the moment</h2>
                </div>
            )}
            <div className="container">
                <div className="row">
                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">name</th>
                                <th scope="col">id</th>
                                <th scope="col">produt_id</th>
                                <th scope="col">color</th>
                                <th scope="col">price</th>
                                <th scope="col">size</th>
                                <th scope="col">company</th>
                                <th scope="col">order_id</th>
                                <th scope="col">quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers && customers.map(customer =>
                                <tr key={customer.name}>
                                    <td>{customer.id}</td>
                                    <td>{customer.product}</td>
                                    <td>{customer.price}</td>
                                    <td>{customer.size}</td>
                                    <td>{customer.company}</td>
                                    <td>{customer.order_id}</td>
                                    <td>{customer.quantity}</td>
                                    <td>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                <Link to={`edit/${customer.id}`} className="btn btn-sm btn-outline-secondary">Edit Customer </Link>
                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteCustomer(customer.id)}>Delete Customer</button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
}