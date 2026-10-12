/**
 * Root component.
 *
 * @summary Standalone root component that renders the application layout.
 * @author Juan Diego Flores Rios
 */
import {Component} from '@angular/core';
import {Layout} from './shared/presentation/components/layout/layout';

/**
 * Application root.
 */
@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
