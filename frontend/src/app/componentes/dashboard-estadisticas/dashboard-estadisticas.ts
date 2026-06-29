import { Component, ElementRef, inject, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { EstadisticasService } from '../../servicios/estadisticas-service';

@Component({
  selector: 'app-dashboard-estadisticas',
  imports: [FormsModule],
  templateUrl: './dashboard-estadisticas.html',
  styleUrl: './dashboard-estadisticas.css',
})
export class DashboardEstadisticas implements AfterViewInit {
  @ViewChild('graficoPublicaciones') canvas!: ElementRef;
  @ViewChild('graficoComentarios') canvasComentarios!: ElementRef;
  @ViewChild('graficoComentariosPublicaciones') canvasComentariosPublicaciones!: ElementRef;
  estadisticasService = inject(EstadisticasService);
  desde = '2026-01-01';
  hasta = '2026-12-31';
  grafico: any;
  grafico2: any;
  grafico3: any;

  ngAfterViewInit(): void {
    this.cargarGrafico();
  }

  cargarGrafico() {
    if (this.grafico) {
      this.grafico.destroy();
    }

    this.estadisticasService
      .getPublicacionesPorUsuario(this.desde, this.hasta)
      .subscribe((datos) => {
        const labels = datos.map((d) => d.nombreUsuario);
        const cantidades = datos.map((d) => d.cantidadPublicaciones);

        this.grafico = new Chart(this.canvas.nativeElement, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{ label: 'Publicaciones', data: cantidades }],
          },
          options: {
            maintainAspectRatio: false,
          },
        });
      });

    this.estadisticasService.getComentariosPorDia(this.desde, this.hasta).subscribe((datos) => {
      const labels = datos.map((d) => d._id);
      const cantidades = datos.map((d) => d.cantidad);

      if (this.grafico2) this.grafico2.destroy();
      this.grafico2 = new Chart(this.canvasComentarios.nativeElement, {
        type: 'line',
        data: { labels: labels, datasets: [{ label: 'Comentarios', data: cantidades }] },
        options: {
          maintainAspectRatio: false,
        },
      });
    });

    this.estadisticasService
      .getComentariosPorPublicacion(this.desde, this.hasta)
      .subscribe((datos) => {
        const labels = datos.map((d) => d.titulo);
        const cantidades = datos.map((d) => d.cantidad);

        if (this.grafico3) this.grafico3.destroy();
        this.grafico3 = new Chart(this.canvasComentariosPublicaciones.nativeElement, {
          type: 'pie',
          data: { labels: labels, datasets: [{ label: 'Comentarios', data: cantidades }] },
          options: {
            maintainAspectRatio: false,
          },
        });
      });
  }
}
