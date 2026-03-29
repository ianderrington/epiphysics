"""
Manim animations for Epimechanics state/representation concepts.

Run with:
    manim -pql state_representation.py StateRepresentationScene
    manim -pqh state_representation.py StateRepresentationScene  # high quality

For all scenes:
    manim -pql state_representation.py
"""

from manim import *
import numpy as np


class StateRepresentationScene(Scene):
    """Animate the relationship between potential state space and representations."""
    
    def construct(self):
        # Colors
        TERRITORY_COLOR = "#7ec8e3"
        MAP_COLOR = "#e94560"
        ACTUAL_COLOR = "#00ff88"
        
        # Title
        title = Text("States and Representations", font_size=42)
        title.to_edge(UP)
        self.play(Write(title))
        self.wait(0.5)
        
        # LEFT: Potential State Space (Territory)
        territory_label = Text("Potential State Space 𝒳", font_size=24, color=TERRITORY_COLOR)
        territory_label.move_to(LEFT * 4 + UP * 2)
        
        subtitle_territory = Text("the territory", font_size=16, color=GRAY)
        subtitle_territory.next_to(territory_label, DOWN, buff=0.1)
        
        # Manifold as ellipse
        manifold = Ellipse(width=4, height=3, color=TERRITORY_COLOR)
        manifold.set_fill(color=TERRITORY_COLOR, opacity=0.2)
        manifold.move_to(LEFT * 4 + DOWN * 0.5)
        
        # Grid lines on manifold
        grid_lines = VGroup()
        for i in range(-2, 3):
            h_line = Arc(radius=2, angle=PI/3, start_angle=PI/3 + i*0.15, color=TERRITORY_COLOR)
            h_line.set_stroke(opacity=0.3)
            h_line.move_to(manifold.get_center())
            grid_lines.add(h_line)
        
        # Potential state points (dim)
        potential_points = VGroup()
        for _ in range(8):
            p = Dot(
                point=manifold.get_center() + np.array([
                    np.random.uniform(-1.5, 1.5),
                    np.random.uniform(-1, 1),
                    0
                ]),
                radius=0.05,
                color=TERRITORY_COLOR
            )
            p.set_opacity(0.3)
            potential_points.add(p)
        
        # Actual state (bright)
        actual_state = Dot(
            point=manifold.get_center() + RIGHT * 0.5 + UP * 0.3,
            radius=0.12,
            color=ACTUAL_COLOR
        )
        actual_state.set_glow_factor(0.5)
        
        actual_label = MathTex("x", font_size=28, color=ACTUAL_COLOR)
        actual_label.next_to(actual_state, UR, buff=0.1)
        
        actual_sublabel = Text("(actual state)", font_size=12, color=GRAY)
        actual_sublabel.next_to(actual_label, DOWN, buff=0.05)
        
        # Animate territory
        self.play(
            Write(territory_label),
            Write(subtitle_territory),
        )
        self.play(
            Create(manifold),
            Create(grid_lines),
        )
        self.play(
            *[FadeIn(p) for p in potential_points],
        )
        self.play(
            GrowFromCenter(actual_state),
            Write(actual_label),
            Write(actual_sublabel),
        )
        self.wait()
        
        # RIGHT: Representation (Map)
        map_label = Text("Representation X", font_size=24, color=MAP_COLOR)
        map_label.move_to(RIGHT * 4 + UP * 2)
        
        subtitle_map = Text("the map", font_size=16, color=GRAY)
        subtitle_map.next_to(map_label, DOWN, buff=0.1)
        
        # Container
        map_container = RoundedRectangle(
            width=3.5, height=3.5, 
            corner_radius=0.2,
            color=MAP_COLOR
        )
        map_container.set_fill(color="#1a1a2e", opacity=0.8)
        map_container.move_to(RIGHT * 4 + DOWN * 0.5)
        
        # Point estimate
        point_label = Text("point estimate", font_size=14, color="#f39422")
        point_label.move_to(map_container.get_center() + UP * 1.2 + LEFT * 0.8)
        
        point_dot = Dot(color="#f39422", radius=0.1)
        point_dot.next_to(point_label, RIGHT, buff=0.3)
        
        point_symbol = MathTex(r"\hat{x}", font_size=24, color="#f39422")
        point_symbol.next_to(point_dot, RIGHT, buff=0.1)
        
        # Distribution
        dist_label = Text("distribution", font_size=14, color=MAP_COLOR)
        dist_label.move_to(map_container.get_center() + LEFT * 0.8)
        
        # Bell curve
        bell_curve = FunctionGraph(
            lambda x: np.exp(-x**2),
            x_range=[-2, 2],
            color=MAP_COLOR
        )
        bell_curve.scale(0.5)
        bell_curve.next_to(dist_label, RIGHT, buff=0.2)
        
        dist_symbol = MathTex(r"P(x)", font_size=20, color=MAP_COLOR)
        dist_symbol.next_to(bell_curve, RIGHT, buff=0.1)
        
        # Partial observation
        partial_label = Text("partial obs.", font_size=14, color="#9d65c9")
        partial_label.move_to(map_container.get_center() + DOWN * 1.2 + LEFT * 0.8)
        
        partial_lines = VGroup(
            DashedLine(ORIGIN, DOWN * 0.4, color="#9d65c9"),
            Line(RIGHT * 0.3, RIGHT * 0.3 + DOWN * 0.4, color="#9d65c9"),
            DashedLine(RIGHT * 0.6, RIGHT * 0.6 + DOWN * 0.4, color="#9d65c9", dash_length=0.05),
        )
        partial_lines.next_to(partial_label, RIGHT, buff=0.3)
        partial_lines[2].set_opacity(0.4)
        
        # Animate map side
        self.play(
            Write(map_label),
            Write(subtitle_map),
        )
        self.play(Create(map_container))
        self.play(
            Write(point_label), GrowFromCenter(point_dot), Write(point_symbol),
        )
        self.play(
            Write(dist_label), Create(bell_curve), Write(dist_symbol),
        )
        self.play(
            Write(partial_label), Create(partial_lines),
        )
        self.wait()
        
        # CENTER: Mapping arrow
        arrow = CurvedArrow(
            start_point=manifold.get_right() + UP * 0.3,
            end_point=map_container.get_left() + UP * 0.3,
            color=MAP_COLOR,
            angle=-0.3
        )
        
        arrow_label = Text("representation", font_size=14, color=MAP_COLOR)
        arrow_label.next_to(arrow, UP, buff=0.1)
        
        arrow_sublabel = Text("partial projection", font_size=11, color=GRAY)
        arrow_sublabel.next_to(arrow, DOWN, buff=0.1)
        
        self.play(
            Create(arrow),
            Write(arrow_label),
            Write(arrow_sublabel),
        )
        self.wait()
        
        # Fidelity
        fidelity = MathTex(
            r"\mathcal{F}(X, x) = \text{fidelity}",
            font_size=28,
            color=ACTUAL_COLOR
        )
        fidelity.to_edge(DOWN, buff=1)
        
        fidelity_sub = Text("how well the map tracks the territory", font_size=14, color=GRAY)
        fidelity_sub.next_to(fidelity, DOWN, buff=0.1)
        
        self.play(
            Write(fidelity),
            Write(fidelity_sub),
        )
        self.wait(2)
        
        # Key insight
        self.play(*[FadeOut(mob) for mob in self.mobjects])
        
        insight_title = Text("Key Insight", font_size=32, color=WHITE)
        insight_title.to_edge(UP, buff=1)
        
        insight_text = Text(
            "Representations are themselves states.",
            font_size=28,
            color=TERRITORY_COLOR
        )
        insight_text.next_to(insight_title, DOWN, buff=0.5)
        
        insight_sub = Text(
            "Every representation must be instantiated somewhere —\nin neurons, silicon, ink — with its own potential state space.",
            font_size=18,
            color=GRAY,
            line_spacing=1.5
        )
        insight_sub.next_to(insight_text, DOWN, buff=0.3)
        
        self.play(Write(insight_title))
        self.play(Write(insight_text))
        self.play(Write(insight_sub))
        self.wait(3)


class FourLayerScene(Scene):
    """Animate the four-layer architecture."""
    
    def construct(self):
        # Colors for each layer
        EVENT_COLOR = "#1a5a8a"
        STRUCTURE_COLOR = "#533483"
        DESCRIPTOR_COLOR = "#9d65c9"
        OBSERVABLE_COLOR = "#f39422"
        
        title = Text("The Four-Layer Architecture", font_size=38)
        title.to_edge(UP)
        subtitle = Text("from causal events to observable quantities", font_size=18, color=GRAY)
        subtitle.next_to(title, DOWN, buff=0.1)
        
        self.play(Write(title), Write(subtitle))
        self.wait(0.5)
        
        # Create layers bottom-up
        layers = []
        layer_data = [
            ("Event Layer", "e : 𝒮ᵢ → 𝒮ⱼ", "no physics assumed", EVENT_COLOR),
            ("Structure Layer", "Bond b, Loop ℒ", "patterns in cause-plex", STRUCTURE_COLOR),
            ("Descriptor Layer", "Q1–Q5 properties", "structural classification", DESCRIPTOR_COLOR),
            ("Observable Layer", "ℳ, W, 𝒫, ρₐc", "where symmetries hold", OBSERVABLE_COLOR),
        ]
        
        for i, (name, content, desc, color) in enumerate(layer_data):
            y_pos = -2 + i * 1.3
            
            rect = RoundedRectangle(
                width=10, height=1.1,
                corner_radius=0.15,
                color=color,
                fill_opacity=0.7
            )
            rect.move_to(UP * y_pos)
            
            layer_name = Text(name, font_size=22, color=WHITE, weight=BOLD)
            layer_name.move_to(rect.get_left() + RIGHT * 1.5)
            
            layer_content = Text(content, font_size=16, color=WHITE)
            layer_content.move_to(rect.get_center())
            
            layer_desc = Text(desc, font_size=12, color=color)
            layer_desc.move_to(rect.get_right() + LEFT * 1.5)
            
            layers.append(VGroup(rect, layer_name, layer_content, layer_desc))
        
        # Animate layers appearing bottom-up
        for i, layer in enumerate(layers):
            self.play(
                FadeIn(layer[0]),
                Write(layer[1]),
                Write(layer[2]),
                Write(layer[3]),
                run_time=0.8
            )
            self.wait(0.3)
        
        # Emergence arrow
        arrow = Arrow(
            start=DOWN * 2.5 + LEFT * 5.5,
            end=UP * 2 + LEFT * 5.5,
            color=WHITE,
            buff=0
        )
        arrow_label = Text("emergence", font_size=14, color=WHITE)
        arrow_label.rotate(PI/2)
        arrow_label.next_to(arrow, LEFT, buff=0.1)
        
        self.play(
            Create(arrow),
            Write(arrow_label),
        )
        
        self.wait(2)
        
        # Final insight
        insight = Text(
            "Energy lives at Observable Layer — it emerges where time-translation symmetry holds",
            font_size=16,
            color=GRAY
        )
        insight.to_edge(DOWN, buff=0.5)
        
        self.play(Write(insight))
        self.wait(3)


class RepresentationalFidelityScene(Scene):
    """Animate how fidelity affects prediction."""
    
    def construct(self):
        title = Text("Representational Fidelity", font_size=36)
        title.to_edge(UP)
        self.play(Write(title))
        
        # Fidelity equation
        equation = MathTex(
            r"\mathcal{F}(X, x) = 1 - d(X, x)",
            font_size=32
        )
        equation.next_to(title, DOWN, buff=0.5)
        self.play(Write(equation))
        
        # Two scenarios side by side
        # High fidelity
        high_title = Text("High Fidelity", font_size=20, color="#00ff88")
        high_title.move_to(LEFT * 3.5 + UP * 0.5)
        
        # Tight distribution around true state
        high_curve = FunctionGraph(
            lambda x: 2 * np.exp(-4 * x**2),
            x_range=[-2, 2],
            color="#00ff88"
        )
        high_curve.scale(0.6)
        high_curve.move_to(LEFT * 3.5 + DOWN * 0.5)
        
        high_point = Dot(color="#ffffff", radius=0.08)
        high_point.move_to(high_curve.get_center() + UP * 0.1)
        
        high_label = MathTex(r"\mathcal{F} \to 1", font_size=24, color="#00ff88")
        high_label.next_to(high_curve, DOWN, buff=0.3)
        
        high_pred = Text("accurate predictions", font_size=14, color=GRAY)
        high_pred.next_to(high_label, DOWN, buff=0.1)
        
        # Low fidelity
        low_title = Text("Low Fidelity", font_size=20, color="#e94560")
        low_title.move_to(RIGHT * 3.5 + UP * 0.5)
        
        # Diffuse distribution
        low_curve = FunctionGraph(
            lambda x: 0.4 * np.exp(-0.3 * x**2),
            x_range=[-3, 3],
            color="#e94560"
        )
        low_curve.scale(0.6)
        low_curve.move_to(RIGHT * 3.5 + DOWN * 0.5)
        
        low_point = Dot(color="#ffffff", radius=0.08)
        low_point.move_to(RIGHT * 2.5 + DOWN * 0.3)  # Off-center
        
        low_label = MathTex(r"\mathcal{F} \to 0", font_size=24, color="#e94560")
        low_label.next_to(low_curve, DOWN, buff=0.3)
        
        low_pred = Text("poor predictions", font_size=14, color=GRAY)
        low_pred.next_to(low_label, DOWN, buff=0.1)
        
        # Animate
        self.play(
            Write(high_title), Write(low_title),
        )
        self.play(
            Create(high_curve), Create(low_curve),
            GrowFromCenter(high_point), GrowFromCenter(low_point),
        )
        self.play(
            Write(high_label), Write(low_label),
            Write(high_pred), Write(low_pred),
        )
        
        self.wait()
        
        # Prediction principle
        principle = Text(
            "Given sufficient computation, predictive accuracy scales with fidelity.",
            font_size=18,
            color=WHITE
        )
        principle.to_edge(DOWN, buff=0.8)
        
        box = SurroundingRectangle(principle, color="#f39422", buff=0.2)
        
        self.play(
            Write(principle),
            Create(box),
        )
        self.wait(3)
